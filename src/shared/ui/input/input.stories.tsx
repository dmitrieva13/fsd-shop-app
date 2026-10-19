import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './input';
import { fn } from '@storybook/test';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'shared/input',
  component: Input,
  tags: ['autodocs'], 
};

export default meta;
type Story = StoryObj<typeof Input>;

/** 
 * Value = ''. Input should be empty. 
 * 
 * Input should have brown borders with border-radius 6px and X-button inside.
 */
export const EmptyInput: Story = {
    args: {
        defaultValue: ''
    }
};

/** 
 * Value = ''. Input should render placeholder text "placeholder".
 */
export const Placeholder: Story = {
    args: {
        value: '',
        placeholder: 'placeholder',
        onChange: fn()
    }
};

/** 
 * Input should be disabled.
 */
export const DisabledInput: Story = {
    args: {
        disabled: true,
        value: 'Not allowed to edit'
    },
    
};

/** 
 * Input should render long value correctly inside input.
 * Value should not overlap X-button..
 */
export const LongStringInput: Story = {
    args: {
        defaultValue: 'Loremipsumdolorsitamet,consecteturadipiscingelit,seddoeiusmodtemporincididuntutlaboreetdoloremagnaaliqua.'
    },
    
};

/** 
 * Input should call inChande and onClear correctly.
 */
export const InteractiveInput: Story = {
    render: (args: any) => {
        const [value, setValue] = useState('');
        
        return (
          <Input 
            {...args} 
            value={value} 
            onChange={(e) => setValue(e.target.value)}
            onClear={() => setValue('')} 
          />
        );
      },
    args: {
        placeholder: 'type something'
    },
};
