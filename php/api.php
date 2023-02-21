<?php
$connection = createConnection();

if ($_POST['method'] != null) {
    call_user_func($_POST['method']);
}

function createConnection()
{
    $host = "192.168.137.1";
    $user = "root";
    $pass = "root";
    $db = "stroykastore";

    return new mysqli($host, $user, $pass, $db);
}

function query($query)
{
    global $connection;
    $connection->real_query($query);
    $result = $connection->use_result();
    return $result;
}

function getPopularBrands()
{
    $result = query("SELECT Id,Img FROM `brand` WHERE img <> '' ORDER BY Popularity LIMIT 12;");
    $brands = [];
    foreach ($result as $row) {
        $brand = new stdClass();
        $brand->id = (int)$row['Id'];
        $brand->img = (string)$row['Img'];
        $brands[] = $brand;
    }
    echo json_encode($brands);
}

function getPopularCategories()
{
    $result = query("SELECT Id,Name,img FROM (SELECT SuperCategoryId,Max(Popularity) as maxpop FROM `category` GROUP BY SuperCategoryId) as T JOIN category as C ON c.SuperCategoryId = t.SuperCategoryId AND c.Popularity = t.maxpop");
    $categories = [];
    foreach ($result as $row) {
        $category = new stdClass();
        $category->id = (int) $row['Id'];
        $category->name = (string) $row['Name'];
        $category->img = (string) $row['img'];
        $categories[] = $category;
    }
    echo json_encode($categories);
}

function getPopularProducts()
{
    $result = query("SELECT Id,Name,Price,img,CountLeft FROM `product` ORDER BY `Popularity` LIMIT 12");
    $products = [];
    foreach ($result as $row) {
        $product = new stdClass();
        $product->id = (int) $row['Id'];
        $product->name = (string) $row['Name'];
        $product->img = (string) $row['img'];
        $product->price = (float) $row['Price'];
        $product->countLeft = (int) $row['CountLeft'];
        $products[] = $product;
    }

    echo json_encode($products);
}

function getDiscounts()
{
    $result = query("SELECT product.CountLeft,product.Id,discount.Size,product.Name,product.Price,product.img FROM `discount` JOIN product ON discount.ProductId = product.Id LIMIT 4");
    $discounts = [];
    foreach ($result as $row) {
        $discount = new stdClass();
        $discount->id = (int) $row['Id'];
        $discount->size = (int) $row['Size'];
        $discount->name = (string) $row['Name'];
        $discount->price = (float) $row['Price'];
        $discount->img = $row['img'];
        $discount->countLeft = (int) $row['CountLeft'];
        $discounts[] = $discount;
    }
    echo json_encode($discounts);
}

function getComments()
{
    $result = query("SELECT p.Name,comment.Text,p.img, comment.Date FROM `comment` JOIN profile as p on comment.ProfileId = p.Id LIMIT 4");
    $comments = [];
    foreach ($result as $row) {
        $comment = new stdClass();
        $comment->profile = new stdClass();
        $comment->comment = new stdClass();

        $comment->profile->name = (string) $row['Name'];
        $comment->profile->img = (string) $row['img'];

        $comment->comment->text = (string) $row['Text'];
        $comment->comment->date = $row['Date'];
        $comments[] = $comment;
    }
    echo json_encode($comments);
}

function getCitiesByName()
{
    global $connection;
    if ($_POST['q'] != '') {
        $result = $connection->query("SELECT * FROM city WHERE Name LIKE '%" . $_POST["q"] . "%' LIMIT 15");
        $cities = [];
        foreach ($result as $row) {
            $city = new stdClass();
            $city->id = (int) $row['Id'];
            $city->name = (string) $row['Name'];
            $cities[] = $city;
        }
        echo json_encode($cities);
    }
}

function getCities()
{
    $result = query("SELECT * FROM `city`");
    $cities = [];
    foreach ($result as $row) {
        $city = new stdClass();
        $city->id = (int) $row['Id'];
        $city->name = (string) $row['Name'];
        $cities[] = $city;
    }
    echo json_encode($cities);
}

function update_location()
{
    global $connection;
    $response = new stdClass();
    if ($_POST['cityId'] != null && $_POST['token'] != null) {
        $result = $connection->query("UPDATE profile INNER JOIN access_token ON profile.Id = access_token.ProfileId SET CityId = " . $_POST['cityId'] . " WHERE access_token.Token = '" . $_POST['token'] . "'");
        $response->success = $connection->affected_rows;
    } else {
        $response->error = "cityId or token is empty.";
    }
    echo json_encode($response);
}

function get_search_results()
{
    global $connection;
    if ($_POST['q'] != null) {
        $result = $connection->query("SELECT product.Id,product.Name, product.img, ROUND(product.Price*(1-0.01*IFNULL(MAX(discount.Size),0))) as Price FROM `product` LEFT JOIN discount ON product.Id = discount.ProductId WHERE (discount.StartDate< NOW() OR discount.StartDate IS NULL) AND (discount.EndDate > NOW() OR discount.EndDate IS NULL) AND product.Name LIKE '%" . $_POST['q'] . "%'  GROUP BY (product.Id) ORDER BY product.Id  LIMIT 5");
        $products = [];
        foreach ($result as $row) {
            $product = new stdClass();
            $product->id = $row['Id'];
            $product->name = $row['Name'];
            $product->img = $row['img'];
            $product->price = $row['Price'];
            $products[] = $product;
        }
        $response = new stdClass();
        $response->products = $products;

        $result2 = $connection->query("SELECT category.Id,supercategory.Name as supercategoryName, category.Name as categoryName FROM `category` INNER JOIN supercategory on category.SuperCategoryId = supercategory.Id WHERE category.Name LIKE '%" . $_POST['q'] . "%' LIMIT 3");
        $categories = [];
        foreach ($result2 as $row) {
            $category = new stdClass();
            $category->id = $row['Id'];
            $category->supercategoryName = $row['supercategoryName'];
            $category->categoryName = $row['categoryName'];
            $categories[] = $category;
        }
        $response->categories = $categories;
        echo json_encode($response);
    }
}

// SET @countleft = (SELECT CountLeft FROM `product` WHERE Id = 1 LIMIT 1);
// UPDATE `product` SET `CountLeft`=(@countleft-2) WHERE Id = 1;

function addToShoppingCart()
{
    global $connection;
    $response = new stdClass();
    if ($_POST['token'] != 0 && $_POST['productId'] != 0 && $_POST['count'] != 0) {

        $connection->query("SELECT profileId into @profileId FROM `access_token` WHERE Token = '" . $_POST['token'] . "' LIMIT 1;
        INSERT INTO `shoppingcart`(`ProfileId`, `ProductId`, `Count`) VALUES (@profileId," . $_POST['productId'] . "," . $_POST['count'] . ");");
        $result = $connection->query("SELECT Name,price,img from `product` where Id = " . $_POST['productId'] . " LIMIT 1;");

        $row = $result->fetch_assoc();
        $row_item = new stdClass();
        $row_item->name = $row['Name'];
        $row_item->price = (int)$row['price'];
        $row_item->count = (int)$_POST['count'];
        $row_item->image = $row['img'];
        $response = $row_item;
    } else {
        $response->error = "productId or token or count is empty.";
    }
    echo json_encode($response);
}

function getBrandsAlphavite()
{
    global $connection;
    $result = $connection->query("SELECT DISTINCT SUBSTRING(Name,1,1) as name FROM `brand` ORDER BY name");
    $response = new stdClass();
    $array = [];
    $array[] = "Все";
    foreach ($result as $row) {
        $array[] = (string) $row['name'];
    }
    $response->array = $array;
    echo json_encode($response);
}

function get_all_brands()
{
    global $connection;
    $result = $connection->query("SELECT DISTINCT SUBSTRING(Name,1,1) as `char` FROM `brand` ORDER BY `char`");
    $response = new stdClass();
    $response->response = [];
    foreach ($result as $row) {
        $item = new stdClass();
        $item->char = $row['char'];
        $item->list = [];
        $response->response[] = $item;
    }

    $result2 = $connection->query("SELECT SUBSTRING(Name,1,1) as `char`, Name FROM `brand` ORDER BY Name");
    foreach ($result2 as $row) {
        foreach ($response->response as $item) {
            if ($row['char'] == $item->char) {
                $item->list[] = $row['Name'];
            }
        }
    }
    echo json_encode($response);
}

function get_brands_by_ids()
{
    global $connection;
    global $connection;
    $result = $connection->query("SELECT DISTINCT SUBSTRING(Name,1,1) as `char` FROM `brand` WHERE SUBSTRING(Name,1,1) IN(" . $_POST['chars'] . ") ORDER BY `char`");
    $response = new stdClass();
    $response->response = [];
    foreach ($result as $row) {
        $item = new stdClass();
        $item->char = $row['char'];
        $item->list = [];
        $response->response[] = $item;
    }

    $result2 = $connection->query("SELECT SUBSTRING(Name,1,1) as `char`, Name FROM `brand` WHERE SUBSTRING(Name,1,1) IN(" . $_POST['chars'] . ") ORDER BY Name");
    foreach ($result2 as $row) {
        foreach ($response->response as $item) {
            if ($row['char'] == $item->char) {
                $item->list[] = $row['Name'];
            }
        }
    }
    echo json_encode($response);
}

function signup()
{
    global $connection;
    $response = new stdClass();
    if ($_POST['name'] != '' && $_POST['email'] != '' && $_POST['password'] != '' && $_POST['cityId'] != 0) {
        $result = $connection->query("INSERT INTO `profile`(`Email`, `Password`, `Name`, `CityId`) VALUES ('" . $_POST['email'] . "','" . $_POST['password'] . "','" . $_POST['name'] . "'," . $_POST['cityId'] . ")");

        $response->result = $connection->affected_rows;
    } else {
        $response->error = "Fields 'Name', 'Email', 'Password' or 'CityId' are empty.";
    }

    echo json_encode($response);
}

function login()
{
    global $connection;
    $response = new stdClass();
    if ($_POST['email'] != null && $_POST['password'] != null) {
        $result = $connection->query("SELECT * FROM `profile` WHERE Email = '" . $_POST['email'] . "' AND Password = '" . $_POST['password'] . "' LIMIT 1");
        if ($connection->affected_rows == 0) {
            $response->error = "Invalid Email/Password.";
        } else {

            $row = $result->fetch_assoc();

            $connection->query("INSERT INTO `access_token`(`Token`,`ProfileId`) VALUES ('" . md5((int)$row['Id'] . '_' . time()) . "', " . (int)$row['Id'] . ");");
            $result2 = $connection->query("SELECT token FROM `access_token` WHERE `id`= LAST_INSERT_ID() and `ProfileId` =" . (int)$row['Id'] . " LIMIT 1");
            $row2 = $result2->fetch_assoc();
            $response->token = $row2['token'];
        }
    } else {
        $response->error = "Email or password are empty.";
    }
    echo json_encode($response);
}

function get_user_info()
{
    global $connection;
    $response = new stdClass();
    if ($_POST['token'] != null) {
        $result = $connection->query("SELECT profile.Name,profile.Surname,profile.Bdate,profile.PhoneNumber,profile.Email FROM `profile` INNER JOIN `access_token` ON profile.Id = access_token.ProfileId WHERE access_token.Token = '" . $_POST['token'] . "' LIMIT 1");
        $row = $result->fetch_assoc();
        $response->name = $row['Name'];
        $response->surname = $row['Surname'];
        $response->birthdate = date('Y-m-d',strtotime($row['Bdate']));
        $response->phone = $row['PhoneNumber'];
        $response->email = $row['Email'];
    } else {
        $response->error = "Empty token.";
    }
    echo json_encode($response);
}

function save_changes_lk()
{
    global $connection;
    $response = new stdClass();
    if ($_POST['token'] != null) {
        $query = "UPDATE `profile` INNER JOIN access_token ON profile.Id = access_token.ProfileId SET ";
        if ($_POST['name']!=null) {
            $query = $query . "`Name`='" . $_POST['name'] . "',";
        }
        if ($_POST['surname']!=null) {
            $query = $query . "`Surname`='" . $_POST['surname'] . "',";
        }
        if ($_POST['bdate']!=null) {
            $query = $query . "`Bdate`='" . $_POST['bdate'] . "',";
        }
        if ($_POST['phone']!=null) {
            $query = $query . "`PhoneNumber`=" . $_POST['phone'] . ",";
        }
        if ($_POST['email']!=null) {
            $query = $query . "`Email`='" . $_POST['email'] . "',";
        }
        if ($_POST['newpassword']!=null) {
            $query = $query . "Password='" . $_POST['newpassword'] . "',";
        }
        
        $query = substr($query, 0, strlen($query) - 1) . " WHERE access_token.token = '" . $_POST['token'] . "'";
        $connection->query($query);
        
        if($connection->affected_rows>0)
        {
            $response->response = 1;
        }
        else
        {
            $response->error = "Error 404";
        }
    }
    else
    {
        $response->error = "Invalid Token.";
    }

    echo json_encode($response);
}

$connection->close();
