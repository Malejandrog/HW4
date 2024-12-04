DROP TABLE IF EXISTS OrderHistory;
DROP TABLE IF EXISTS TransactionInfo;
DROP TABLE IF EXISTS PaymentInfo;
DROP TABLE IF EXISTS OrderInfo;
DROP TABLE IF EXISTS RestaurantLocation;
DROP TABLE IF EXISTS BankAccount;
DROP TABLE IF EXISTS Customer;

CREATE TABLE Customer (
    CustomerID SERIAL PRIMARY KEY, --Made this serial instead of int
    CustomerName VARCHAR(50), --Changed from ERD due to Naming Conflict
    CustomerPassword VARCHAR(50), --Added
    CustomerAddress VARCHAR(50), --Added 
    CustomerCity VARCHAR(50), --Added 
    CustomerState VARCHAR(2), --Added 
    CustomerPhoneNumber VARCHAR(50), --Changed to differentiate Customer/Restaurant numbers
    CustomerEmail VARCHAR(50), --Added
    HasLoyaltyCard BOOLEAN
);

CREATE TABLE BankAccount (
    AccountNumber BIGINT PRIMARY KEY,
    AccountHolderName VARCHAR(50),
    AccountType VARCHAR(50),
    Balance DECIMAL
);

CREATE TABLE RestaurantLocation (
    LocationID VARCHAR(3) PRIMARY KEY,
    RestaurantAddress VARCHAR(50), --Changed from ERD due to Naming Conflict
    RestaurantCity VARCHAR(50), --Added 
    RestaurantState VARCHAR(2), --Changed from ERD due to Naming Conflict
    RestaurantPhoneNumber VARCHAR(50) --Changed to differentiate Customer/Restaurant numbers
);

CREATE TABLE OrderInfo ( --Changed from ERD due to Naming Conflict
    OrderID SERIAL PRIMARY KEY, --Made this serial instead of int
    LocationID VARCHAR(3),
    CustomerID INT,
    OrderDate DATE, --Changed from ERD due to Naming Conflict
    TotalAmount DECIMAL,
    TaxAmount DECIMAL,
    TipAmount DECIMAL,
    PaymentMethod VARCHAR(50),
    FOREIGN KEY (LocationID) REFERENCES RestaurantLocation(LocationID),
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);

CREATE TABLE PaymentInfo (
    PaymentInfoID SERIAL PRIMARY KEY, --Made this serial instead of int
    OrderID INT,
    CustomerID INT,
    CreditCardNumber VARCHAR(50),
    CCV INT,
    ExpirationDate VARCHAR(5),
    BillingAddress VARCHAR(50),
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
    FOREIGN KEY (OrderID) REFERENCES OrderInfo(OrderID)
);

CREATE TABLE TransactionInfo ( --Changed from ERD due to Possible Naming Conflict?
    TransactionID SERIAL PRIMARY KEY, --Made this serial instead of int
    OrderID INT,
    AccountNumber BIGINT, --Fixed from ERD? Said CustomerAccountID on ERD.
    LocationID VARCHAR(3), -- Modify later to be Foreign Key based on Tommy's requirements, Used to be RestaurantAccountID
    TransactionDate DATE,
    PaymentAmount DECIMAL,
    FOREIGN KEY (OrderID) REFERENCES OrderInfo(OrderID),
    FOREIGN KEY (AccountNumber) REFERENCES BankAccount(AccountNumber),
    FOREIGN KEY (LocationID) REFERENCES RestaurantLocation(LocationID)
);

CREATE TABLE OrderHistory( --New Table
    OrderID INT,
    ItemID INT,
    ItemQuantity INT,
    ItemPrice DECIMAL,
    FOREIGN KEY (OrderID) REFERENCES OrderInfo(OrderID),
    PRIMARY KEY (OrderID, ItemID)
);



--DUMMY DATA BELOW



-- Insert data into Customer
--INSERT INTO Customer (CustomerID, CustomerName, CustomerPassword, CustomerAddress, CustomerCity, CustomerState, CustomerPhoneNumber, CustomerEmail, HasLoyaltyCard)
--VALUES
    --(1, 'Test', 'test', '123 Elm St', 'Houston', 'TX', '832-555-1234', 'Test@gmail.com', TRUE);
   /* (2, 'Jane Smith', '456 Oak St', 'Austin', 'TX', '713-555-5678', 'JS@Gmail.com',FALSE),
    (3, 'Michael Johnson', '789 Pine St', 'Dallas', 'TX', '713-555-8765', 'MJ@Gmail.com', TRUE),
    (4, 'Emily Davis', '101 Maple St', 'San Antonio', 'TX', '832-555-4321', 'ED@Gmail.com', FALSE); */


-- Insert data into BankAccount
/* INSERT INTO BankAccount (AccountNumber, AccountHolderName, AccountType, Balance)
VALUES
    (12345678, 'John Doe', 'Checking', 1500.00),
    (87654321, 'Jane Smith', 'Savings', 2500.00),
    (11223344, 'Michael Johnson', 'Checking', 3000.00),
    (44332211, 'Emily Davis', 'Checking',  5000.00); */

-- Insert data into RestaurantLocation
INSERT INTO RestaurantLocation (LocationID, RestaurantAddress, RestaurantCity, RestaurantState, RestaurantPhoneNumber)
VALUES
    ('PHX', '456 Desert St', 'Phoenix', 'AZ', '800-987-6543'),
    ('LAG', '789 Hollywood Blvd', 'Los Angeles', 'CA', '800-555-5678'),
    ('SDE', '123 Ocean Ave', 'San Diego', 'CA', '800-333-4321'),
    ('CHI', '456 Lake Shore Dr', 'Chicago', 'IL', '800-444-5678'),
    ('NYC', '789 Times Square', 'New York', 'NY', '800-222-7654'),
    ('PHI', '123 Liberty Bell St', 'Philadelphia', 'PA', '800-111-8888'),
    ('HOU', '456 Space Center Blvd', 'Houston', 'TX', '800-999-1234'),
    ('SAT', '789 Alamo Rd', 'San Antonio', 'TX', '800-888-4444');


-- Insert data into OrderInfo
/* INSERT INTO OrderInfo (OrderID, LocationID, CustomerID, OrderDate, TotalAmount, TaxAmount, TipAmount, PaymentMethod)
VALUES
    (1, 'HOU', 1, '2024-11-15', 50.00, 5.00, 10.00, 'Credit Card'),
    (2, 'SAT', 2, '2024-11-16', 75.00, 7.50, 15.00, 'Gift Card'),
    (3, 'NYC', 3, '2024-11-17', 100.00, 10.00, 20.00, 'Credit Card'),
    (4, 'HOU', 4, '2024-11-18', 25.00, 2.50, 5.00, 'Debit Card'); */

-- Insert data into PaymentInfo
/* INSERT INTO PaymentInfo (PaymentInfoID, CustomerID, CreditCardNumber, CCV, ExpirationDate, BillingAddress)
VALUES
    (1, 10, '1111111111111111', 123, '12/34', '123 Elm St'),
    (2, 23, '2222222222222222', 456, '11/21', '456 Oak St'),
    (3, 38, '3333333333333333', 789, '10/20', '789 Pine St'),
    (4, 41, '4444444444444444', 321, '9/99', '101 Maple St'); */

-- Insert data into TransactionInfo
/* INSERT INTO TransactionInfo (TransactionID, OrderID, AccountNumber, RestaurantAccountID, TransactionDate, PaymentAmount)
VALUES
    (1, 1, 1, 10, '2024-11-15', 65.00),
    (2, 2, 2, 11, '2024-11-16', 97.50),
    (3, 3, 3, 12, '2024-11-17', 130.00),
    (4, 4, 4, 13, '2024-11-18', 32.50); */