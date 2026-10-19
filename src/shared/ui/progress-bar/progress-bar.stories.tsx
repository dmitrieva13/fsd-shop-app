import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './progress-bar';

const meta: Meta<typeof ProgressBar> = {
  title: 'shared/progress-bar',
  component: ProgressBar,
  tags: ['autodocs'], 
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

/** 
 * Value = 0, max = 100. ProgressBar should be empty.
 */
export const EmptyBar: Story = {
    args: {
        value: 0,
        max: 100,
    },
    parameters: {
        layout: 'padded'
    },
};

/** 
 * Value = 30, max = 100. ProgressBar should be 1/3 filled with dark orange.
 */
export const FilledOn30Percent: Story = {
    args: {
        value: 30,
        max: 100,
    },
    parameters: {
        layout: 'padded'
    },
};

/** 
 * Value = 100, max = 100. ProgressBar should be filled with green.
 */
export const TotallyFilled: Story = {
    args: {
        value: 100,
        max: 100,
    },
    parameters: {
        layout: 'padded'
    },
};

/** 
 * Value = 200, max = 100. ProgressBar should be filled with green, 
 * width should be as in TotallyFilled.
 */
export const Overfilled: Story = {
    args: {
        value: 200,
        max: 100,
    },
    parameters: {
        layout: 'padded'
    },
};

/** 
 * ProgressBar should become wider and brighter green for a moment, then return to initial state.
 * Animation duration is 0.6s.
 */
export const AnimationOnComplete: Story = {
    args: {
      value: 100,
      max: 100, 
    },
    parameters: {
        layout: 'padded'
    },
    decorators: [
      (Story) => {
        const uniqueId = 'progress-animation-infinite-' + Math.random().toString(36).slice(2, 12);
        return(
        <div id={uniqueId}>
            <style>{`
                    #${uniqueId} [data-completed="true"] {
                    animation-iteration-count: infinite !important;
                    -webkit-animation-iteration-count: infinite !important;
                }
            `}</style>
            <Story />
        </div>
      )},
    ],
};