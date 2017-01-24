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
		'Australia', 'France', 'Germany', 'Spain', 'South Africa'];
	
		let saltConsumption = new Float32Array(9);
		let sugarConsumption = new Float32Array(9);

		let i = 1;


		noOfLines.forEach(function(a)	{
			let line = a.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
			let countryCheckCountry = givencountry.includes(line[countryIndex]);

			i = i + 1;
			if(countryCheckCountry)	{
				let salt = line[saltIndex];
				let sugar = line[sugarIndex];
				if(salt === '') {
				salt = 0;
			}
				if(sugar === '') {
					sugar = 0;
				}
				let currentCountryIndex = givencountry.indexOf(line[countryIndex]);
	saltConsumption[currentCountryIndex] = saltConsumption[currentCountryIndex] + parseFloat(salt);
	sugarConsumption[currentCountryIndex] =	sugarConsumption[currentCountryIndex] + parseFloat(sugar);
			}


		});
		i = 0;
		let jsonArray1 = [];

    givencountry.forEach(function() {
			let objPart1 = {};
				objPart1.country = givencountry[i];
				objPart1.salt = saltConsumption[i];
				objPart1.sugar = sugarConsumption[i];
				jsonArray1.push(objPart1);
				i = i + 1;
		});

		fs.writeFile('part1.json', JSON.stringify(jsonArray1));

});
