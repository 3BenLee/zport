import React from 'react';
import { Button } from 'antd';
import './MultiStepper.css';

const MultiStepper = props => {
  const stepperNumbers = [...Array(4).keys()];

  const stepperButtons = stepperNumbers.map(num => {
    return (
      <Button
        key={num}
        type={props.step === num + 1 ? 'primary' : 'default'}
        onClick={() => props.step > num + 1 && props.handleMultiStepper(num + 1)}
      >
        {`Step ${num + 1}`}
      </Button>
    );
  });

  return <div className='stepper'>{stepperButtons}</div>;
};

export default MultiStepper;
