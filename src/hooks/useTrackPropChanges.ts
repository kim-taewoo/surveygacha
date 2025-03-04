import { useEffect, useRef } from "react";

export const useTrackPropChanges = (props: any) => {
  const prevPropsRef = useRef(props);

  useEffect(() => {
    const prevProps = prevPropsRef.current;

    // Get all unique prop names
    const allProps = new Set([
      ...Object.keys(prevProps),
      ...Object.keys(props),
    ]);

    // Track which props changed
    const changedProps: any[] = [];

    allProps.forEach((propName) => {
      if (prevProps[propName] !== props[propName]) {
        const oldValue = prevProps[propName];
        const newValue = props[propName];

        changedProps.push({
          prop: propName,
          from: oldValue,
          to: newValue,
        });
      }
    });

    if (changedProps.length > 0) {
      console.group("Props that changed and caused re-render:");
      changedProps.forEach(({ prop, from, to }) => {
        console.log(
          `${prop}:`,
          "\nPrevious:", from,
          "\nCurrent:", to,
        );
      });
      console.groupEnd();
    }

    prevPropsRef.current = props;
  });
};
