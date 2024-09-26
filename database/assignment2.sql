INSERT INTO account(account_firstname, account_lastname, account_email, account_password)
VALUES(
    'Tony',
    'Stark',
    'tony@starknet.com',
    'Iam1ronM@n'
);

UPDATE account
SET account_type = 'Admin'
WHERE account_id = 1;

DELETE FROM account
WHERE account_id = 1;

SELECT * FROM account;

--Modify GM HUMMER

SELECT REPLACE('a huge interior', 'a huge interior', 'small interiors');

--Inner Join

SELECT i.inv_make, i.inv_model, c.classification_name
FROM inventory i
INNER JOIN classification c
ON i.classification_id = c.classification_id
WHERE i.classification_id = 2;

--add /vehicles to middle of file path

UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images', '/images/vehicles');

UPDATE inventory
SET inv_thumbnail = REPLACE(inv_image, '/images', '/images/vehicles');d

