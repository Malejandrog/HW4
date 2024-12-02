DROP TABLE IF EXISTS TransactionInfo;
DROP TABLE IF EXISTS PaymentInfo;
DROP TABLE IF EXISTS OrderInfo;
DROP TABLE IF EXISTS RestaurantLocation;
DROP TABLE IF EXISTS BankAccount;
DROP TABLE IF EXISTS Customer;

CREATE TABLE Customer (
    CustomerID INT PRIMARY KEY,
    CustomerName VARCHAR(50), --Changed from ERD due to Naming Conflict
    CustomerAddress VARCHAR(50), --Added 
    CustomerCity VARCHAR(50), --Added 
    CustomerState VARCHAR(2), --Added 
    CustomerPhoneNumber VARCHAR(50), --Changed to differentiate Customer/Restaurant numbers
    CustomerEmail VARCHAR(50),
    HasLoyaltyCard BOOLEAN
);

CREATE TABLE BankAccount (
    AccountNumber INT PRIMARY KEY,
    AccountHolderFirstName VARCHAR(50),
    AccountHolderLastName VARCHAR(50),
    AccountType VARCHAR(50),
    Balance DECIMAL
);

CREATE TABLE RestaurantLocation (
    LocationID INT PRIMARY KEY,
    RestaurantAddress VARCHAR(50), --Changed from ERD due to Naming Conflict
    RestaurantCity VARCHAR(50), --Added 
    RestaurantState VARCHAR(2), --Changed from ERD due to Naming Conflict
    RestaurantPhoneNumber VARCHAR(50) --Changed to differentiate Customer/Restaurant numbers
);

CREATE TABLE OrderInfo ( --Changed from ERD due to Naming Conflict
    OrderID INT PRIMARY KEY,
    LocationID INT,
    CustomerID INT,
    OrderItems VARCHAR(9999), --Added 
    OrderDate DATE, --Changed from ERD due to Naming Conflict
    TotalAmount DECIMAL,
    TaxAmount DECIMAL,
    TipAmount DECIMAL,
    PaymentMethod VARCHAR(50),
    FOREIGN KEY (LocationID) REFERENCES RestaurantLocation(LocationID),
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);

CREATE TABLE PaymentInfo (
    PaymentInfoID INT PRIMARY KEY,
    CustomerID INT,
    CreditCardNumber VARCHAR(50),
    CCV INT,
    ExpirationDate DATE, --Not Sure If this Should be DATE? VARCHAR?
    BillingAddress VARCHAR(50),
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);

CREATE TABLE TransactionInfo ( --Changed from ERD due to Possible Naming Conflict?
    TransactionID INT PRIMARY KEY,
    OrderID INT,
    AccountNumber INT, --Fixed from ERD? Said CustomerAccountID on ERD.
    RestaurantAccountID INT, -- Modify later to be Foreign Key based on Tommy's requirements
    TransactionDate DATE,
    PaymentAmount DECIMAL,
    FOREIGN KEY (OrderID) REFERENCES OrderInfo(OrderID),
    FOREIGN KEY (AccountNumber) REFERENCES BankAccount(AccountNumber)
);



--DUMMY DATA BELOW



-- Insert data into Customer
/* INSERT INTO Customer (CustomerID, CustomerFirstName, CustomerLastName, CustomerAddress, CustomerCity, CustomerState, CustomerPhoneNumber, HasLoyaltyCard)
VALUES
    (1, 'John', 'Doe', '123 Elm St', 'Houston', 'TX', '832-555-1234', TRUE),
    (2, 'Jane', 'Smith', '456 Oak St', 'Austin', 'TX', '713-555-5678', FALSE),
    (3, 'Michael', 'Johnson', '789 Pine St', 'Dallas', 'TX', '713-555-8765', TRUE),
    (4, 'Emily', 'Davis', '101 Maple St', 'San Antonio', 'TX', '832-555-4321', FALSE); */


-- Insert data into BankAccount
/* INSERT INTO BankAccount (AccountNumber, AccountHolderFirstName, AccountHolderLastName, BankName, AccountType, Balance)
VALUES
    (12345678, 'John', 'Doe', 'Bank of America',  'Checking', 1500.00),
    (87654321, 'Jane', 'Smith', 'Chase Bank',  'Savings', 2500.00),
    (11223344, 'Michael', 'Johnson', 'Wells Fargo',  'Checking', 3000.00),
    (44332211, 'Emily', 'Davis', 'Citibank',  'Savings', 5000.00); */

-- Insert data into RestaurantLocation
INSERT INTO RestaurantLocation (LocationID, RestaurantAddress, RestaurantCity, RestaurantState, RestaurantPhoneNumber)
VALUES
    (1, '456 Desert St', 'Phoenix', 'AZ', '800-987-6543'),
    (2, '789 Hollywood Blvd', 'Los Angeles', 'CA', '800-555-5678'),
    (3, '123 Ocean Ave', 'San Diego', 'CA', '800-333-4321'),
    (4, '456 Lake Shore Dr', 'Chicago', 'IL', '800-444-5678'),
    (5, '789 Times Square', 'New York', 'NY', '800-222-7654'),
    (6, '123 Liberty Bell St', 'Philadelphia', 'PA', '800-111-8888'),
    (7, '456 Space Center Blvd', 'Houston', 'TX', '800-999-1234'),
    (8, '789 Alamo Rd', 'San Antonio', 'TX', '800-888-4444');


-- Insert data into OrderInfo
/* INSERT INTO OrderInfo (OrderID, LocationID, CustomerID, OrderItems, OrderDate, TotalAmount, TaxAmount, TipAmount, PaymentMethod)
VALUES
    (1, 1, 1, 'The Databurger, Fries', '2024-11-15', 50.00, 5.00, 10.00, 'Credit Card'),
    (2, 2, 2, 'The Double Smash Patty, Fries, Fountain Drink', '2024-11-16', 75.00, 7.50, 15.00, 'Cash'),
    (3, 3, 3, 'Databurger Meal', '2024-11-17', 100.00, 10.00, 20.00, 'Credit Card'),
    (4, 4, 4, 'Chicken Salad', '2024-11-18', 25.00, 2.50, 5.00, 'Debit Card'); */

-- Insert data into PaymentInfo
/* INSERT INTO PaymentInfo (PaymentInfoID, CustomerID, CreditCardNumber, CCV, ExpirationDate, BillingAddress)
VALUES
    (1, 1, '1111 1111 1111 1111', 123, '2025-12-31', '123 Elm St'),
    (2, 2, '2222 2222 2222 2222', 456, '2026-11-30', '456 Oak St'),
    (3, 3, '3333 3333 3333 3333', 789, '2027-10-31', '789 Pine St'),
    (4, 4, '4444 4444 4444 4444', 321, '2028-09-30', '101 Maple St'); */

-- Insert data into TransactionInfo
/* INSERT INTO TransactionInfo (TransactionID, OrderID, AccountID, RestaurantAccountID, TransactionDate, PaymentAmount)
VALUES
    (1, 1, 1, 10, '2024-11-15', 65.00),
    (2, 2, 2, 11, '2024-11-16', 97.50),
    (3, 3, 3, 12, '2024-11-17', 130.00),
    (4, 4, 4, 13, '2024-11-18', 32.50); */