const cron = require("node-cron");
const Inventory = require("../models/Inventory");
const sendEmail = require("../utils/sendEmail");

cron.schedule("* * * * *", async () => {

    console.log("Checking Inventory...");

    try {

        const items = await Inventory.find();

        for (const item of items) {

            if (item.stock < item.threshold) {

                await sendEmail(

                    process.env.ADMIN_EMAIL,

                    "🚨 Low Stock Alert",

                    `Inventory Item: ${item.itemName}

Current Stock: ${item.stock}

Threshold: ${item.threshold}

Please restock this item.`

                );

                console.log(`${item.itemName} alert email sent`);

            }

        }

    } catch (error) {

        console.log(error);

    }

});