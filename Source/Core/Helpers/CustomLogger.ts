/**
    There are no comments here as it is not necessary to modify, it is already prepared for the bot structure.
    If you are changing it, I think you have an idea of ​​what you are doing.
    I am not responsible for errors if this file is modified.
*/


export function info(message: string) {
    return formatLog('INFO', message, '34');
  }
  
  export function error(message: string) {
    return formatLog('ERROR', message, '31');
  }
  
  export function success(message: string) {
    return formatLog('SUCCESS', message, '32');
  }
  
  export function warning(message: string) {
    return formatLog('WARNING', message, '33');
  }
  
  export function bold(message: string) {
    return `\x1b[1m${message}\x1b[0m`;
  }
  
  export function log(type: 'info' | 'error' | 'success' | 'warning' | 'bold', prefix: string, message: string) {
    const timestamp = time();
    const formattedPrefix = formatPrefix(type, prefix);
  
    switch (type) {
      case 'info':
      case 'error':
      case 'success':
      case 'warning':
        console.log(`${formattedPrefix}${timestamp} ${formatLog(type.toUpperCase(), message, getColorCode(type))}`);
        break;
  
      case 'bold':
        console.log(`${formattedPrefix}${timestamp} ${bold(message)}`);
        break;
    }
  }
  
  function formatLog(type: string, message: string, colorCode: string) {
    return `\x1b[${colorCode}m${message}\x1b[0m`;
  }
  
  function formatPrefix(type: string, prefix: string) {
    return `[ ${formatLog(type, `(${prefix})`, getColorCode(type))} ]`;
  }
  
  function getColorCode(type: string) {
    switch (type) {
      case 'info':
        return '34';
      case 'error':
        return '31';
      case 'success':
        return '32';
      case 'warning':
        return '33';
      default:
        return '0';
    }
  }
  
  export function time(date: Date = new Date()) {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
  }