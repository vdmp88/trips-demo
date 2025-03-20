const classNames = (classes: (string | null | undefined | boolean)[]) =>
  classes.filter(Boolean).join(' ');

export default classNames;
