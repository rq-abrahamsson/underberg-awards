import React, { useState, useEffect } from 'react';
import { formatDistance, addWeeks, format } from 'date-fns'

function Calculator() {
    const [currentNumber, setCurrentNumber] = useState('');
    const [currentNumberInt, setCurrentNumberInt] = useState(0);
    const [perWeekNumber, setPerWeekNumber] = useState('');
    const [perWeekNumberInt, setPerWeekNumberInt] = useState(0);

    const awardInfo = [
        {
            name: "The original Underberg herbal truck",
            amount: 288
        },
        {
            name: "The original Underberg herbal truck, personalized",
            amount: 336
        },
        {
            name: "The original Underberg herbal trailer",
            amount: 288
        },
        {
            name: "The original Underberg herbal truck, personalized + The original Underberg herbal trailer",
            amount: 624
        }
    ]

    useEffect(() => {
        let tmp = parseInt(currentNumber)
        if (Number.isInteger(tmp) && tmp > 0) {
            setCurrentNumberInt(tmp);
        }
    }, [currentNumber]);

    useEffect(() => {
        let tmp = parseInt(perWeekNumber)
        if (Number.isInteger(tmp) && tmp > 0) {
            setPerWeekNumberInt(tmp);
        }
    }, [perWeekNumber]);

    function calculateAmountLeft(number) {
        if (currentNumberInt === 0) {
            return "-"
        } else if (number - currentNumberInt < 0) {
            return "You can finally get it"
        } else {
            return "Still missing " + (number - currentNumberInt).toString()
        }
    }

    function calculateEnoughDate(number) {
        if (currentNumberInt === 0 || perWeekNumberInt === 0) {
            return ""
        } else if (number - currentNumberInt < 0) {
            return ""
        } else {
            let amountLeft = number - currentNumberInt
            let weeksLeft = Math.ceil(amountLeft / perWeekNumberInt)
            let enoughDate = addWeeks(new Date(), weeksLeft)
            let numberOfDays = formatDistance(enoughDate, new Date())
            return " - But you will be able to get it in " + numberOfDays + " at " + format(enoughDate, 'yyy-MM-dd')
        }
    }
    const listAwards = awardInfo.map(item => {
        return <li>{item.name}: {calculateAmountLeft(item.amount)}{calculateEnoughDate(item.amount)}</li>
    });

    return (
        <div className="calculator">
            <label for="bottle-tops">Current number of bottle tops</label>
            <br />
            <input type="text" id="bottle-tops" name="bottle-tops" onInput={e => setCurrentNumber(e.target.value)} />
            <br />
            <label for="bottle-tops-week">How many Underbergs do you drink per week?</label>
            <br />
            <input type="text" id="bottle-tops-week" name="bottle-tops-week" onInput={e => setPerWeekNumber(e.target.value)} />
            <h2>Can you get anything?</h2>
            <ul className="calculator-list">
                {listAwards}
            </ul>
        </div>
    );
}

export default Calculator;
