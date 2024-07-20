import React from 'react';
import type { Meta, StoryObj } from "@storybook/react"
import ExecImage, {ExecImageProps} from './ExecImage';

const meta: Meta<typeof ExecImage> = {
  component: ExecImage,
  title: "Components/generic/ExecImage",
};

type Story = StoryObj<typeof meta>;

export default meta;

export const DefaultExecImage: Story = (args: ExecImageProps) => <ExecImage {...args} />;

DefaultExecImage.args = {
  src: "https://static01.nyt.com/images/2022/12/30/multimedia/30soccer-ronaldo-1-76fd/30soccer-ronaldo-1-76fd-mediumSquareAt3X.jpg",
  alt: "Placeholder Image",
  title: 'Admin suii',
  name: 'Ronaldo',
};