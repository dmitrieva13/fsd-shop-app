import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { BookmarkHeart } from 'react-bootstrap-icons';

const meta: Meta<typeof Button> = {
  title: 'shared/button',
  component: Button,
  tags: ['autodocs'], 
};

export default meta;
type Story = StoryObj<typeof Button>;

/** 
 * Should render empty button with brown background. Button should have width
 * and height. On hover background should get darker.
 */
export const EmptyButton: Story = {
    decorators: [
        (Story) => {
            return (
                <Story />
            );
        },
    ],
};

/** 
 * Should render button with correct name. Name color is white.
 */
export const ButtonWithText: Story = {
    args: {
        children: 'Test button'
    },
    decorators: [
        (Story) => {

            return (
                <Story />
            );
        },
    ],
};

/** 
 * Should render button with icon inside.
 */
export const ButtonWithIcon: Story = {
    args: {
        children: (<BookmarkHeart size={20} color='white' />)
    },
    decorators: [
        (Story) => {

            return (
                <Story />
            );
        },
    ],
};

/** 
 * Should render button with div inside. Div should render correctly and
 * have thier style (pink color and italic font).
 */
export const ButtonWithDiv: Story = {
    args: {
        children: (<div style={{color: 'pink', fontStyle: 'italic'}}>
            Div click
        </div>)
    },
    decorators: [
        (Story) => {

            return (
                <Story />
            );
        },
    ],
};

/** 
 * Should render disabled button. Button should:
 * - not to be clickable
 * - have gray background
 * - have initial cursor, not pointer
 */
export const ButtonDisabled: Story = {
    args: {
        disabled: true,
        children: 'Disabled'
    },
    decorators: [
        (Story) => {

            return (
                <Story />
            );
        },
    ],
};

/** 
 * Should render button with long text correctly. Text should be on multiple
 * strings, not overflowing button.
 */
export const ButtonWithLongText: Story = {
    args: {
        children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris non massa velit. Ut ut accumsan tellus. Maecenas laoreet erat aliquam imperdiet malesuada. Mauris vulputate, velit ac suscipit molestie, mi quam mattis massa, quis faucibus mi lectus egestas elit. Praesent lobortis fringilla mauris, sit amet porta lacus rutrum a.'
    },
    decorators: [
        (Story) => {

            return (
                <div style={{width: '250px'}}>
                    <Story />
                </div>
            );
        },
    ],
};

/** 
 * Should render button with one long word correctly. Word hould be on multiple
 * strings, not overflowing button.
 */
export const ButtonWithLongWord: Story = {
    args: {
        children: 'ThisisaverylongtextforthebuttonThisisaverylongtextforthebuttonThisisaverylongtextforthebuttonThisisaverylongtextforthebuttonThisisaverylongtextforthebuttonThisisaverylongtextforthebuttonThisisaverylongtextforthebutton'
    },
    decorators: [
        (Story) => {

            return (
                <div style={{width: '250px'}}>
                    <Story />
                </div>
            );
        },
    ],
};