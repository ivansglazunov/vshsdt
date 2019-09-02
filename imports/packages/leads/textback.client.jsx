import React, { useRef, useEffect } from 'react';
import useScript, { ScriptStatus } from '@charlietango/use-script'

export const TextBackComponent = ({
  widgetId
}) => {
  const ref = useRef();
  const [ready, status] = useScript('//unpkg.com/@textback/notification-widget@latest/build/index.js');

  useEffect(() => {
    if (process.browser && ready) {
      const element = ref.current;
      var options = {
        widgetId,
        element,
        data: { userId: typeof(localStorage) === 'object' ? localStorage.getItem('userId') : null },
      };
      // eslint-disable-next-line no-undef
      if (typeof(TextBack) === 'object') new TextBack.NotificationWidget(options);
    }
  }, [ready]);

  return <div ref={ref}/>
};
