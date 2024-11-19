CREATE TABLE Customer (
    CustomerID INT PRIMARY KEY,
    CustomerName VARCHAR(50), --Changed from ERD due to Naming Conflict
    PhoneNumber VARCHAR(50),
    HasLoyaltyCard BOOLEAN
);

CREATE TABLE BankAccount (
    AccountID INT PRIMARY KEY,
    AccountHolderName VARCHAR(50),
    BankName VARCHAR(50),
    AccountNumber INT,
    AccountType VARCHAR(50),
);

CREATE TABLE Order (
    OrderID INT PRIMARY KEY,
    LocationID INT,
    CustomerID INT,
    OrderDate DATE, --Changed from ERD due to Naming Conflict
    TotalAmount FLOAT,
    TaxAmount FLOAT,
    TipAmount FLOAT,
    PaymentMethod VARCHAR(50),
    FOREIGN KEY (LocationID) REFERENCES RestaurantLocation(LocationID),
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);

CREATE TABLE PaymentInfo (
    PaymentInfoID INT PRIMARY KEY,
    CustomerID INT,
    CreditCardNumber INT,
    CCV INT,
    ExpirationDate DATE, --Not Sure If this Should be DATE? VARCHAR?
    BillingAddress VARCHAR(50),
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);

CREATE TABLE RestaurantLocation (
    LocationID INT PRIMARY KEY,
    LocationAddress VARCHAR(50), --Changed from ERD due to Naming Conflict
    City VARCHAR(50),
    USState VARCHAR(50), --Changed from ERD due to Naming Conflict
    PhoneNumber INT
);

CREATE TABLE TransactionInfo ( --Changed from ERD due to Possible Naming Conflict?
    TransactionID INT PRIMARY KEY,
    OrderID INT,
    AccountID INT, --Fixed from ERD? Said CustomerAccountID on ERD.
    --RestarauntAccountID - Not sure what this is refering to in the ERD, possbily LocationID?
    TransactionDate DATE,
    PaymentAmount FLOAT,
    FOREIGN KEY (OrderID) REFERENCES Order(OrderID),
    FOREIGN KEY (AccountID) REFERENCES BankAccount(AccountID)
);
