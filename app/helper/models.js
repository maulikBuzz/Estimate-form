const database = require('../../config/db')

const insertContactUSData = async () => {
 
    return new Promise(async () => {
        const query = [
            `CREATE TABLE IF NOT EXISTS users (
                id int(11) NOT NULL AUTO_INCREMENT,
                user_name text NOT NULL,
                email varchar(255) NOT NULL,
                password varchar(255) NOT NULL,
                status int(11) NOT NULL DEFAULT 1,
                deleted_at int(11) NOT NULL DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            )`,
            ` CREATE TABLE IF NOT EXISTS contact_us (
                id int(11) NOT NULL AUTO_INCREMENT,
                name text DEFAULT NULL,
                contact_no varchar(255) DEFAULT NULL,
                email varchar(255) DEFAULT NULL,
                message text DEFAULT NULL,
                status int(11) NOT NULL DEFAULT 1 COMMENT '1:Pending,2:done',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            )`,
            ` CREATE TABLE IF NOT EXISTS business_categories (
                id int(11) NOT NULL AUTO_INCREMENT,
                name varchar(255) DEFAULT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            )`,
            `CREATE TABLE IF NOT EXISTS products (
                id INT(11) NOT NULL AUTO_INCREMENT,
                name VARCHAR(255) DEFAULT NULL,
                bus_cat_id INT(11) NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            );`,
            `CREATE TABLE IF NOT EXISTS product_variants (
                id INT(11) NOT NULL AUTO_INCREMENT,
                name varchar(255) DEFAULT NULL,
                product_id INT(11) NOT NULL,
                status int(11) NOT NULL DEFAULT 1,
                deleted_at int(11) NOT NULL DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
                PRIMARY KEY (id)
            );`,
            `CREATE TABLE IF NOT EXISTS user_products (
                id INT(11) NOT NULL AUTO_INCREMENT,
                user_id INT(11) NOT NULL,
                product_id INT(11) NOT NULL,
                status int(11) NOT NULL DEFAULT 1,
                deleted_at int(11) NOT NULL DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
                PRIMARY KEY (id)
            );`,
            `CREATE TABLE IF NOT EXISTS measurements (
                id INT(11) NOT NULL AUTO_INCREMENT,
                unit varchar(255) NOT NULL,
                abbreviation varchar(255) NOT NULL,
                status int(11) NOT NULL DEFAULT 1,
                deleted_at int(11) NOT NULL DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
                PRIMARY KEY (id)
            );`,
            `CREATE TABLE IF NOT EXISTS sub_product  (
                id INT(11) NOT NULL AUTO_INCREMENT,
                user_pro_id INT(11) NOT NULL,
                user_id INT(11) NOT NULL,
                name varchar(255) DEFAULT NULL,
                uom JSON,
                price int(11) NOT NULL,
                status int(11) NOT NULL DEFAULT 1,
                deleted_at int(11) NOT NULL DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
                PRIMARY KEY (id)
            );`,
        ];
        
        query.map((item) => {
            database.query(item, function (err) {
                if (err) {
                    console.log({ error: err });
                }
            });
        })
    });
}
module.exports = {
    insertContactUSData
}
 