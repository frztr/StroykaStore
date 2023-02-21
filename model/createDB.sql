CREATE TABLE Brand
(
    Id int NOT NULL AUTO_INCREMENT,
    Name varchar(255) NOT NULL,
    Popularity bigint,
    PRIMARY KEY (Id)
);

CREATE TABLE Provider
(
	Id bigint NOT NULL AUTO_INCREMENT,
    Name varchar(255) NOT null,
    PRIMARY KEY (Id)
);

CREATE TABLE OrderStatus
(
	Id int NOT NULL AUTO_INCREMENT,
    Name varchar(255) NOT NULL,
    PRIMARY KEY (Id)
);

CREATE TABLE City
(
	Id bigint NOT NULL AUTO_INCREMENT,
    Name varchar(255) NOT NULL,
    PRIMARY KEY (Id)
);

CREATE TABLE Profile
(
    Id bigint NOT NULL AUTO_INCREMENT,
    Email varchar(255) NOT NULL,
    Password varchar(255) NOT NULL,
    Name varchar(255) NOT NULL,
    Surname varchar(255),
    Bdate datetime,
    PhoneNumber bigint,
    CityId bigint NOT NULL,
    PRIMARY KEY (Id),
    FOREIGN KEY (CityId) REFERENCES City(Id)
);

CREATE TABLE Comment
(
    Id bigint NOT NULL AUTO_INCREMENT,
    Text varchar(4000) NOT NULL,
    Date datetime NOT NULL,
    ProfileId bigint NOT NULL,
    PRIMARY KEY (Id),
    FOREIGN KEY (ProfileId) REFERENCES Profile(Id)
);

CREATE TABLE `Order`
(
	Id bigint NOT NULL AUTO_INCREMENT,
    ProfileId bigint NOT NULL,
    Date datetime NOT NULL,
    Status int NOT NULL,
    PostIndex bigint,
    City varchar(255),
    Street varchar(255),
    House varchar(255),
    Entrance int,
    Floor int,
    Room int,
    Phone bigint,
    Email varchar(255),
    Message varchar(255),
    PRIMARY KEY (Id),
    FOREIGN KEY (Status) REFERENCES OrderStatus(Id),
    FOREIGN KEY (ProfileId) REFERENCES Profile(Id)
);

CREATE TABLE SuperCategory
(
	Id int NOT NULL AUTO_INCREMENT,
    Name varchar(255) NOT NULL,
    PRIMARY KEY (Id)
);

CREATE TABLE Category
(
	Id int NOT NULL AUTO_INCREMENT,
    Name varchar(255) NOT NULL,
    SuperCategoryId int NOT NULL,
    Popularity bigint,
    PRIMARY KEY (Id),
    FOREIGN KEY (SuperCategoryId) REFERENCES SuperCategory(Id)
);

CREATE TABLE Product
(
	Id bigint NOT NULL AUTO_INCREMENT,
    Name varchar(255) NOT NULL,
    Price double NOT NULL,
    Popularity bigint NOT NULL,
    CategoryId int NOT NULL,
    BrandId int,
    PRIMARY KEY (Id),
    FOREIGN KEY (BrandId) REFERENCES Brand(Id),
    FOREIGN KEY (CategoryId) REFERENCES Category(Id)
);

CREATE TABLE DescriptionParagraph
(
	Id bigint NOT NULL AUTO_INCREMENT,
    ProductId bigint NOT NULL,
    Text varchar(4000),
    PRIMARY KEY (Id),
    FOREIGN KEY (ProductId) REFERENCES Product(Id)
);

CREATE TABLE ShoppingCart
(
	Id bigint NOT NULL AUTO_INCREMENT,
    ProfileId bigint NOT NULL,
    ProductId bigint NOT NULL,
    Count int NOT NULL,
    PRIMARY KEY (Id),
    FOREIGN KEY (ProfileId) REFERENCES Profile(Id),
    FOREIGN KEY (ProductId) REFERENCES Product(Id)
);

CREATE TABLE Discount
(
    Id bigint NOT NULL AUTO_INCREMENT,
    Size int NOT NULL,
    ProductId bigint NOT NULL,
    StartDate datetime NOT NULL,
    EndDate datetime NOT NULL,
    PRIMARY KEY (Id),
    FOREIGN KEY (ProductId) REFERENCES Product(Id)
);

CREATE TABLE ProviderStorage
(
	Id int NOT NULL AUTO_INCREMENT,
    ProductId bigint NOT NULL,
    ProviderId bigint NOT NULL,
    Count bigint,
    PRIMARY KEY (Id),
    FOREIGN KEY (ProductId) REFERENCES Product(Id),
    FOREIGN KEY (ProviderId) REFERENCES Provider(id)
);

CREATE TABLE OrderProducts
(
	Id bigint NOT NULL AUTO_INCREMENT,
    OrderId bigint NOT NULL,
    ProductId bigint NOT NULL,
    Count int NOT NULL,
    PRIMARY KEY (Id),
    FOREIGN KEY (OrderId) REFERENCES `Order`(Id),
    FOREIGN KEY (ProductId) REFERENCES Product(Id)
);