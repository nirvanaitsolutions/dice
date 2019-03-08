import { observable } from 'aurelia-binding';

type Direction = 'over' | 'under';

export class Dice {
    private minimumBet = 1;

    @observable private sliderValue = 50;

    private sliderMinValue = 2;
    private sliderMaxValue = 95;

    private winPercentage = 50;
    private direction: Direction = 'under';

    sliderValueChanged(value) {
        if (this.direction === 'under') {            
            this.winPercentage = (value - 1);
        }
    }
}
