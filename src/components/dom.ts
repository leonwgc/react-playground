// eslint-disable-next-line @typescript-eslint/no-explicit-any
export let passiveIfSupported: boolean | any = false;

try {
  window &&
    window.addEventListener(
      'test',
      null,
      Object.defineProperty({}, 'passive', {
        get() {
          passiveIfSupported = { passive: true };
        }
      })
    );
} catch (err) {}
