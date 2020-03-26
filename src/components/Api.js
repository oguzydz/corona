export const getMainNumbers = ($) => {
    const mainValues = $('.maincounter-number');
    const coronavirusCases = mainValues.eq(0).text().trim();
    const deaths = mainValues.eq(1).text().trim();
    const recovered = mainValues.eq(2).text().trim();
    const result = {
        coronavirusCases,
        deaths,
        recovered
    };
    return result;
}

export const getActiveCases = ($) => {
    const casesCardsMainValues = $('.number-table-main');
    const casesCardsSecondaryValues = $('.panel-front, .number-table');
    const currentlyInfectedPatients = $(casesCardsMainValues).eq(0).text().trim();
    const inMildCondition = $(casesCardsSecondaryValues).eq(0).text().trim();
    const inMildConditionPercent = $(casesCardsSecondaryValues).eq(0).next().text().trim();
    const seriousOrCritical = $(casesCardsSecondaryValues).eq(1).text().trim();
    const seriousOrCriticalPercent = $(casesCardsSecondaryValues).eq(1).next().text().trim();
    return {
        currentlyInfectedPatients,
        inMildCondition,
        inMildConditionPercent,
        seriousOrCritical,
        seriousOrCriticalPercent
    }
}


export const getClosedCases = ($) => {
    const casesCardsMainValues = $('.number-table-main');
    const casesCardsSecondaryValues = $('.panel-front, .number-table');
    const casesWhichHadAnOutcome = $(casesCardsMainValues).eq(1).text().trim();
    const recoveredDischarged = $(casesCardsSecondaryValues).eq(2).text().trim();
    const recoveredDischargedPercent = $(casesCardsSecondaryValues).eq(2).next().text().trim();
    const deaths = $(casesCardsSecondaryValues).eq(3).text().trim();
    const deathsPercent = $(casesCardsSecondaryValues).eq(3).next().text().trim();
    return {
        casesWhichHadAnOutcome,
        recoveredDischarged,
        recoveredDischargedPercent,
        deaths,
        deathsPercent
    };
}


export const getActiveCasesGraphData = ($) => {
    const dom = $('script').get()[20].children[0].data
    const categories = eval(dom.match(/categories: \[(\s?"(\w|\s)+",?)+\]/g)[0]);
    const data = eval(dom.match(/data: \[(\s?(\d|\s)+,?)+\]/g)[0]);
    return { categories, data };
}

export const getClosedCasesGraphData = ($) => {
    const dom = $('script').get()[21].children[0].data
    const categories = eval(dom.match(/categories: \[(\s?"(\w|\s)+",?)+\]/g)[0]);
    const deathRate = eval(dom.match(/data: \[(\d+\.?\d+,?)+]/g)[0]);
    const recoveryRate = eval(dom.match(/data: \[(\d+\.?\d+,?)+]/g)[1]);
    return { categories, deathRate, recoveryRate };
}

export const getTotalCasesGraphData = ($) => {
    const dom = $('script').get()[22].children[0].data
    const categories = eval(dom.match(/categories: \[(\s?"(\w|\s)+",?)+\]/g)[0]);
    const data = eval(dom.match(/data: \[(\s?(\d|\s)+,?)+\]/g)[0]);
    return { categories, data };
}

export const getTotalDeathsGraphData = ($) => {
    const dom = $('script').get()[24].children[0].data;
    const categories = eval(dom.match(/categories: \[(\s?"(\w|\s)+",?)+\]/g)[0]);
    const data = eval(dom.match(/data: \[(\s?(\d|\s)+,?)+\]/g)[0]);
    return { categories, data };
}

export const getCountriesTableData = ($) => {
    const countries = [];
    const rows = $('table#main_table_countries_today tbody tr');


    for (var i = 0; i < rows.length; i++) {
        var row = $(rows).eq(i);
        var children = $(row).children('td');
        var country = children.eq(0).text().trim();
        
        var totalCases = children.eq(1).text().trim();
        var newCases = children.eq(2).text().trim();
        var totalDeaths = children.eq(3).text().trim();
        var newDeaths = children.eq(4).text().trim();
        var totalRecovered = children.eq(5).text().trim();
        var activeCases = children.eq(6).text().trim();
        var criticalCases = children.eq(7).text().trim();
        var totalCasesIn1m = children.eq(8).text().trim();
        countries.push(
            {
                country,
                totalCases,
                newCases,
                totalDeaths,
                newDeaths,
                totalRecovered,
                activeCases,
                criticalCases,
                totalCasesIn1m,
            }
        );
    }
    return countries;
     
}

export const getCountryData = ($, name) => {

}
