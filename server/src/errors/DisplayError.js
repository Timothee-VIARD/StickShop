export function logError(message, error) {
  console.error('\x1b[31m%s\x1b[0m', message, error);
}

export function logWarning(message) {
  console.log('\x1b[33m%s\x1b[0m', message);
}

export function logSuccess(message) {
  console.log('\x1b[32m%s\x1b[0m', message);
}

export function logInfo(message) {
  console.log('\x1b[36m%s\x1b[0m', message);
}
