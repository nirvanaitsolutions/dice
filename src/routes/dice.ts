import { observable } from 'aurelia-binding';

type Direction = 'over' | 'under';

export class Dice {
    private minimumBet = 1;

    @observable private sliderValue = 50;

    private sliderMinValue = 1;
    private sliderMaxValue = 100;

    private winPercentage = 50;
    private direction: Direction = 'under';

    sliderValueChanged(value) {
        if (this.direction === 'under') {
            const percentage = (this.sliderMaxValue - value);
            
            if (value >= 50) {
                this.winPercentage = percentage + 1;
            } else {
                this.winPercentage = percentage - 1;
            }

            console.log(percentage);
        }
    }
}
