-- Insert data into Customer
INSERT INTO Customer (CustomerID, CustomerName, CustomerPhoneNumber, HasLoyaltyCard)
VALUES
    (1, 'John Doe', '832-555-1234', TRUE),
    (2, 'Jane Smith', '713-555-5678', FALSE),
    (3, 'Michael Johnson', '713-555-8765', TRUE),
    (4, 'Emily Davis', '832-555-4321', FALSE);

-- Insert data into BankAccount
INSERT INTO BankAccount (AccountID, AccountHolderName, BankName, AccountNumber, AccountType, Balance)
VALUES
    (1, 'John Doe', 'Bank of America', 12345678, 'Checking', 1500.00),
    (2, 'Jane Smith', 'Chase Bank', 87654321, 'Savings', 2500.00),
    (3, 'Michael Johnson', 'Wells Fargo', 11223344, 'Checking', 3000.00),
    (4, 'Emily Davis', 'Citibank', 44332211, 'Savings', 5000.00);

-- Insert data into RestaurantLocation
INSERT INTO RestaurantLocation (LocationID, LocationAddress, City, USState, RestaurantPhoneNumber)
VALUES
    (1, '123 Main St', 'Springfield', 'IL', '800-123-4567'),
    (2, '456 Elm St', 'Chicago', 'IL', '800-765-4321'),
    (3, '789 Oak St', 'New York', 'NY', '800-112-2334'),
    (4, '101 Maple St', 'San Francisco', 'CA', '800-135-2468');

-- Insert data into Order
INSERT INTO "Order" (OrderID, LocationID, CustomerID, OrderDate, TotalAmount, TaxAmount, TipAmount, PaymentMethod)
VALUES
    (1, 1, 1, '2024-11-15', 50.00, 5.00, 10.00, 'Credit Card'),
    (2, 2, 2, '2024-11-16', 75.00, 7.50, 15.00, 'Cash'),
    (3, 3, 3, '2024-11-17', 100.00, 10.00, 20.00, 'Credit Card'),
    (4, 4, 4, '2024-11-18', 25.00, 2.50, 5.00, 'Debit Card');

-- Insert data into PaymentInfo
INSERT INTO PaymentInfo (PaymentInfoID, CustomerID, CreditCardNumber, CCV, ExpirationDate, BillingAddress)
VALUES
    (1, 1, 4111111111111111, 123, '2025-12-31', '123 Main St'),
    (2, 2, 5555555555554444, 456, '2026-11-30', '456 Elm St'),
    (3, 3, 378282246310005, 789, '2027-10-31', '789 Oak St'),
    (4, 4, 6011111111111117, 321, '2028-09-30', '101 Maple St');

-- Insert data into TransactionInfo
INSERT INTO TransactionInfo (TransactionID, OrderID, AccountID, RestaurantAccountID, TransactionDate, PaymentAmount)
VALUES
    (1, 1, 1, 10, '2024-11-15', 65.00),
    (2, 2, 2, 11, '2024-11-16', 97.50),
    (3, 3, 3, 12, '2024-11-17', 130.00),
    (4, 4, 4, 13, '2024-11-18', 32.50);
