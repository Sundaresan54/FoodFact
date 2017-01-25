let fs = require('fs');
let fullContent = '';
fs.createReadStream('FoodFacts.csv')
    .on('data', function(c) {
        fullContent = fullContent + c;
    })
    .on('end', function() {
        let noOfLines = fullContent.split('\n');
        let headings = noOfLines[0].split(',');
        let countryIndex = headings.indexOf('countries_en');
        let saltIndex = headings.indexOf('salt_100g');
        let sugarIndex = headings.indexOf('sugars_100g');
        let protienIndex = headings.indexOf('proteins_100g');
        let carbohydratesIndex = headings.indexOf('carbohydrates_100g');
        let fatIndex = headings.indexOf('fat_100g');
        let givencountry = ['Netherlands', 'Canada', 'United Kingdom', 'United States',
            'Australia', 'France', 'Germany', 'Spain', 'South Africa'
        ];
        let northEurope = ['United Kingdom', 'Denmark', 'Sweden Norway'];
        let centralEurope = ['France', 'Belgium', 'Germany', 'Switzerland', 'Netherlands'];
        let southEurope = ['Portugal', 'Greece', 'Italy', 'Spain', 'Croatia', 'Albania'];
        let saltConsumption = new Float32Array(9);
        let sugarConsumption = new Float32Array(9);
        let northFat = 0;
        let southFat = 0;
        let centralFat = 0;
        let northProtein = 0;
        let southProtein = 0;
        let centralProtein = 0;
        let northCarbohydrate = 0;
        let southCarbohydrate = 0;
        let centralCarbohydrate = 0;
        // let i = 1;


        noOfLines.forEach(function(a) {
            let line = a.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            let countryCheckCountry = givencountry.includes(line[countryIndex]);
            let countrycheckNorth = northEurope.includes(line[countryIndex]);
            let countrycheckCentral = centralEurope.includes(line[countryIndex]);
            let countrycheckSouth = southEurope.includes(line[countryIndex]);
            i = i + 1;
            if (countryCheckCountry) {
                let salt = line[saltIndex];
                let sugar = line[sugarIndex];
                if (salt === '') {
                    salt = 0;
                }
                if (sugar === '') {
                    sugar = 0;
                }
                let currentCountryIndex = givencountry.indexOf(line[countryIndex]);
                saltConsumption[currentCountryIndex] = saltConsumption[currentCountryIndex] + parseFloat(salt);
                sugarConsumption[currentCountryIndex] = sugarConsumption[currentCountryIndex] + parseFloat(sugar);
            }
            if (countrycheckNorth || countrycheckCentral || countrycheckSouth) {
                let fat = line[fatIndex];
                let protein = line[protienIndex];
                let carbohydrates = line[carbohydratesIndex];
                if (fat === '') {
                    fat = 0;
                }
                if (protein === '') {
                    protein = 0;
                }
                if (carbohydrates === '') {
                    carbohydrates = 0;
                }
                if (countrycheckNorth) {
                    northFat = northFat + parseFloat(fat);
                    northProtein = northProtein + parseFloat(protein);
                    northCarbohydrate = northCarbohydrate + parseFloat(carbohydrates);
                }
                if (countrycheckCentral) {
                    centralFat = centralFat + parseFloat(fat);
                    centralProtein = centralProtein + parseFloat(protein);
                    centralCarbohydrate = centralCarbohydrate + parseFloat(carbohydrates);
                }
                if (countrycheckSouth) {
                    southFat = southFat + parseFloat(fat);
                    southProtein = southProtein + parseFloat(protein);
                    southCarbohydrate = southCarbohydrate + parseFloat(carbohydrates);
                }
            }
        });
        i = 0;
        let jsonArray1 = [];
        let jsonArray2 = [];
        givencountry.forEach(function() {
            let objPart1 = {};
            objPart1.country = givencountry[i];
            objPart1.salt = saltConsumption[i];
            objPart1.sugar = sugarConsumption[i];
            jsonArray1.push(objPart1);
            i = i + 1;
        });

        let objNorth = {};
        objNorth.countryName = 'northEurope';
        objNorth.northFat = northFat;
        objNorth.northProtein = northProtein;
        objNorth.northCarbohydrate = northCarbohydrate;
        jsonArray2.push(objNorth);

        let objCentral = {};
        objCentral.countryName = 'centralEurope';
        objCentral.centralFat = centralFat;
        objCentral.centralProtein = centralProtein;
        objCentral.centralCarbohydrate = centralCarbohydrate;
        jsonArray2.push(objCentral);

        let objSouth = {};
        objSouth.countryName = 'southEurope';
        objSouth.southFat = southFat;
        objSouth.southProtein = northProtein;
        objSouth.southCarbohydrate = southCarbohydrate;
        jsonArray2.push(objSouth);
        fs.writeFile('part1.json', JSON.stringify(jsonArray1));
        fs.writeFile('part2.json', JSON.stringify(jsonArray2));
    });
