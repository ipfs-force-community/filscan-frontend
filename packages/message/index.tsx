/** @format */

import { getSvgIcon } from '@/svgsIcon';
import { message } from 'antd';

// 创建一个全局的消息管理器
const messageManager = {
  hideMessage: null as null | (() => void),

  showMessage: ({
    type,
    duration = 3,
    content,
    icon,
    suffix,
  }: {
    type: string;
    content: string;
    duration?: number;
    icon?: JSX.Element;
    suffix?: JSX.Element;
  }) => {
    if (messageManager.hideMessage) {
      messageManager.hideMessage();
    }

    const show_config: any = {};
    if (icon) {
      show_config.icon = icon;
    }

    messageManager.hideMessage = message.open({
      content: suffix ? (
        <span className='flex gap-x-4 items-center'>
          {content} {suffix}
        </span>
      ) : (
        <span className='flex gap-x-4 items-center'>
          {content}
          <span
            className='cursor-pointer'
            onClick={() => {
              messageManager.hide();
            }}>
            {getSvgIcon('closeIcon')}
          </span>
        </span>
      ),
      duration,
      type,
      ...show_config,
    });
  },

  hide: () => {
    if (messageManager.hideMessage) {
      messageManager.hideMessage();
      messageManager.hideMessage = null;
    }
  },
};

export default messageManager;
