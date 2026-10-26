"use client";

import { useViraPassword } from "@virastack/password";

export function PasswordField() {
  // hideOnBlur: hide again when focus leaves the field or the tab is hidden
  const { inputProps, btnProps, isVisible, setVisible } = useViraPassword({ hideOnBlur: true });

  return (
    <>
      <label htmlFor={inputProps.id}>Password</label>
      <div>
        <input {...inputProps} placeholder="Your password" />
        <button {...btnProps} />
      </div>
      <div>
        <button type="button" onClick={() => setVisible(true)}>
          Show
        </button>
        <button type="button" onClick={() => setVisible(false)}>
          Hide
        </button>
      </div>
      <p>Status: {isVisible ? "visible" : "hidden"}</p>
    </>
  );
}
