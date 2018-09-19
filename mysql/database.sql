CREATE DATABASE IF NOT EXISTS buglogs;

USE buglogs;

CREATE TABLE IF NOT EXISTS buglogs (
   `bug_id` INT(11) unsigned  NOT NULL AUTO_INCREMENT,
   `bug_brief` VARCHAR(500) NOT NULL DEFAULT '',
   `bug_detail` VARCHAR(3000) NOT NULL DEFAULT '',
   PRIMARY KEY (`bug_id`),
   UNIQUE KEY (`bug_brief`)
) DEFAULT CHARSET=utf8;