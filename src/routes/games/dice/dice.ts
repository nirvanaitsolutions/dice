import { observable } from 'aurelia-binding';

import styles from './dice.css';

type Direction = 'over' | 'under';

export class Dice {
    private styles = styles;

    private minimumBet = 1;

    @observable private sliderValue = 50;

    private multiplier = '';

    private sliderMinValue = 2;
    private sliderMaxValue = 95;

    private winPercentage = 50;
    @observable private direction: Direction = 'under';

    betMultiplier(multiplier) {
        if (this.multiplier === multiplier) {
            this.multiplier = '';

            return;
        }
        
        this.multiplier = multiplier;
    }

    changeDirection(direction) {
        console.log(direction);
        this.direction = direction;
    }

    directionChanged(value) {
        if (value === 'under') {
            this.sliderMinValue = 2;
            this.sliderMaxValue = 95;
        } else if (value === 'over') {
            this.sliderMinValue = 6;
            this.sliderMaxValue = 99;
        }

        if (this.sliderValue > this.sliderMaxValue) {
            this.sliderValue = this.sliderMaxValue;
        }
    }

    sliderValueChanged(value) {
        if (this.direction === 'under') {            
            this.winPercentage = (value - 1);
        }
    }
}
