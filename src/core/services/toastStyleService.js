var globalToastStyle = {
  toaster: "b-toaster-top-right",
  appendToast: true,
  solid: true
};

function getToastConfig(title, variant, delay = "5000") {
  return {
    ...globalToastStyle,
    title: title,
    variant: variant,
    autoHideDelay: delay
  };
}

export { globalToastStyle, getToastConfig };
