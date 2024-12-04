DROP TABLE IF EXISTS OrderHistory;
DROP TABLE IF EXISTS TransactionInfo;
DROP TABLE IF EXISTS PaymentInfo;
DROP TABLE IF EXISTS OrderInfo;
DROP TABLE IF EXISTS RestaurantLocation;
DROP TABLE IF EXISTS BankAccount;
DROP TABLE IF EXISTS Customer;

--Stores Data on the Customer
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

--Stores bank info for customers
CREATE TABLE BankAccount (
    AccountNumber BIGINT PRIMARY KEY,
    CustomerID INT,
    AccountHolderName VARCHAR(50),
    AccountType VARCHAR(50),
    Balance DECIMAL,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);

--Stores info on locations of the chain
CREATE TABLE RestaurantLocation (
    LocationID VARCHAR(3) PRIMARY KEY,
    RestaurantAddress VARCHAR(50), --Changed from ERD due to Naming Conflict
    RestaurantCity VARCHAR(50), --Added 
    RestaurantState VARCHAR(2), --Changed from ERD due to Naming Conflict
    RestaurantPhoneNumber VARCHAR(50) --Changed to differentiate Customer/Restaurant numbers
);

--Stores information for an order including at which restaurant, the customer making the order, time and money info 
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

--stores information on the payment info for an order
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

--info on the transaction
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

--stores the orders made and the items in those orders
CREATE TABLE OrderHistory( --New Table
    OrderID INT,
    ItemID VARCHAR(3),
    ItemQuantity INT,
    FOREIGN KEY (OrderID) REFERENCES OrderInfo(OrderID),
    PRIMARY KEY (OrderID, ItemID)
);

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

