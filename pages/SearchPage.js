import {Selector, t} from 'testcafe';


export class SearchPage {
    constructor() {
        this.dropdown = {
            firsRegistration: Selector('#yearFilter'),
            fromYear: Selector('div[class="container___2SMPk menuContainer___22AAQ containerBottomEnd___1NYoL"] select[id="rangeStart"]'),
            year2015: Selector('option[data-qa-selector-value="2015"]'),
            sortByDropdown: Selector('#sortBy'),
            descendingPrice: Selector('option[data-qa-selector-value="offerPrice.amountMinorUnits.desc"]')
        };

        this.icon = {
            favoriteIcon: Selector('svg[class="icon___2c4Kt"]')
        };

        this.carInfo = {
            price: Selector('div[data-qa-selector="price"]'),
            carYear: Selector('li[class="specItem___2gMHn"]:first-child')
        }
}
    async selectCarFromYear (year) {
        await t.click(this.dropdown.fromYear)
        await t.click(`option[data-qa-selector-value="${year}"]`);
    }

    async verifyDescendingPrice() {
        //Get the prices from UI and push it into array
        const pricesCount = await this.carInfo.price.count;
        let pricesList =[];
        for (let i=0; i< pricesCount; i++) {
            pricesList.push(await this.carInfo.price.nth(i).textContent);
        }
        // Iterate through array to get "clean" integer prices
        for (let i=0; i <pricesList.length; i++) {
            pricesList[i] = pricesList[i].replace(/\D/g,'');
        }
        //Verify that array of prices is sorted in descending order
        for (let i=0; i < pricesList.length-1; i++) {
            if (pricesList[i] < pricesList[i+1]) {
                return false;
            }
        }
        return true;
    }

    async verifyFromYearSorting (year) {
        const yearsCount = await this.carInfo.carYear.count;
        let yearsList =[];
        for (let i=0; i< yearsCount; i++) {
            yearsList.push(await this.carInfo.carYear().nth(i).textContent);
        }
        // Clean up years array
        for (let i=0; i< yearsList.length; i++) {
            yearsList[i] = yearsList[i].replace(/\D/g,'');
        }
        //Check if only year from and later are present in array
        for (let i=0; i< yearsList.length; i++) {
            if (yearsList[i] < year) {
                return false;
            }
        }
        return true;
    }
}