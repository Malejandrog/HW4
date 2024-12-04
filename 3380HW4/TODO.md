Update ER Diagram to include new/renamed elements

Tables filled upon startup:
RestaurantLocation
BankAccount

Tables filled after Register/Login:
Customer
BankAccount

Tables filled after ordering
PaymentInfo
OrderInfo
TransactionInfo
OrderHistory (Not Yet)

Instructions for HW4 and grading criteria requirements: 

1. Normalization: Ensure that all tables are normalized to BCNF
2. Table joinability: All tables should be designed in a way that they can be effectively joined using appropriate keys. 
3. ER Diagram: All relationships depicted in the ER diagram must be one-to-many ( 1:N). 
4. Transaction SQL code: All transaction related SQL code should be enclosed withing START TRANSACTION; and END TRANSACTION; 
5. Indexing: Every table must have at least one index. Include at least one large table (e.g. call detail records, food order items) with a non unique index to handle large volumes. 
6. Primary keys: most tables should have simple (single column) primary keys. At least one table must have a composite primary key 
7. Data Volume Guideline: 
- Customers: Hundreds of customer records
- Phone Calls: Hundreds of phone call records
- Food Orders: Thousands of food items ordered, tracked per day/week 
8. Table Count: At least 10 tables

1: Done
2: Done
3: WiP
4: Done? Need to Check
5: Done
6: Done
7: Need to do
8: Need to do