import './Button.css';

/**
 * Button Component
 * 
 * A reusable button component that can be styled and configured for different actions.
 * 
 * Props:
 * - label: The text to display on the button.
 * - onClick: The function to call when the button is clicked.
 * - style: The style of the button, can be 'outline' or 'filled'.
 * - fullWidth: Boolean indicating if the button should take the full width of its container.
 */
const Button = ({ children, onClick, disabled, style="filled", fullWidth }) => {
  const classNames = ['button'];
  if (style) {
    classNames.push(`button--${style}`);
  }
  if (disabled) {
    classNames.push('button--disabled');
  }
  if (fullWidth) {
    classNames.push('button--full-width');
  }
  
  return (
    <button
      className={classNames.join(' ')}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;