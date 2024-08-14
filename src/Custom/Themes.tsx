export const customButtonTheme = {
  base: "group relative flex items-stretch justify-center p-1 text-center font-medium transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:outline-none",
  fullSized: "w-full",
  color: {
    dark: "border border-transparent bg-gray-800 text-white focus:ring-4 focus:ring-gray-300 enabled:hover:bg-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-gray-800 dark:enabled:hover:bg-gray-700",
    failure:
      "border border-transparent bg-red-700 text-white focus:ring-4 focus:ring-red-300 enabled:hover:bg-red-800 dark:bg-red-600 dark:focus:ring-red-900 dark:enabled:hover:bg-red-700",
    gray: ":ring-cyan-700 border border-gray-200 bg-white text-gray-900 focus:text-cyan-700 focus:ring-4 enabled:hover:bg-gray-100 enabled:hover:text-cyan-700 dark:border-gray-600 dark:bg-transparent dark:text-gray-400 dark:enabled:hover:bg-gray-700 dark:enabled:hover:text-white",
    info: "border border-transparent bg-cyan-700 text-white focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-cyan-800 dark:bg-cyan-600 dark:focus:ring-cyan-800 dark:enabled:hover:bg-cyan-700",
    light:
      "border border-gray-300 bg-white text-gray-900 focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-600 dark:text-white dark:focus:ring-gray-700 dark:enabled:hover:border-gray-700 dark:enabled:hover:bg-gray-700",
    purple:
      "border border-transparent bg-purple-700 text-white focus:ring-4 focus:ring-purple-300 enabled:hover:bg-purple-800 dark:bg-purple-600 dark:focus:ring-purple-900 dark:enabled:hover:bg-purple-700",
    success:
      "border border-transparent bg-green-700 text-white focus:ring-4 focus:ring-green-300 enabled:hover:bg-green-800 dark:bg-green-600 dark:focus:ring-green-800 dark:enabled:hover:bg-green-700",
    warning:
      "border border-transparent bg-yellow-400 text-white focus:ring-4 focus:ring-yellow-300 enabled:hover:bg-yellow-500 dark:focus:ring-yellow-900",
    blue: "border border-transparent bg-blue-700 text-white focus:ring-4 focus:ring-blue-300 enabled:hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800",
    cyan: "border border-cyan-300 bg-white text-cyan-900 focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-cyan-100 dark:border-cyan-600 dark:bg-cyan-600 dark:text-white dark:focus:ring-cyan-700 dark:enabled:hover:border-cyan-700 dark:enabled:hover:bg-cyan-700",
    green:
      "border border-green-300 bg-white text-green-900 focus:ring-4 focus:ring-green-300 enabled:hover:bg-green-100 dark:border-green-600 dark:bg-green-600 dark:text-white dark:focus:ring-green-700 dark:enabled:hover:border-green-700 dark:enabled:hover:bg-green-700",
    indigo:
      "border border-indigo-300 bg-white text-indigo-900 focus:ring-4 focus:ring-indigo-300 enabled:hover:bg-indigo-100 dark:border-indigo-600 dark:bg-indigo-600 dark:text-white dark:focus:ring-indigo-700 dark:enabled:hover:border-indigo-700 dark:enabled:hover:bg-indigo-700",
    lime: "border border-lime-300 bg-white text-lime-900 focus:ring-4 focus:ring-lime-300 enabled:hover:bg-lime-100 dark:border-lime-600 dark:bg-lime-600 dark:text-white dark:focus:ring-lime-700 dark:enabled:hover:border-lime-700 dark:enabled:hover:bg-lime-700",
    pink: "border border-pink-300 bg-white text-pink-900 focus:ring-4 focus:ring-pink-300 enabled:hover:bg-pink-100 dark:border-pink-600 dark:bg-pink-600 dark:text-white dark:focus:ring-pink-700 dark:enabled:hover:border-pink-700 dark:enabled:hover:bg-pink-700",
    red: "border border-red-300 bg-white text-red-900 focus:ring-4 focus:ring-red-300 enabled:hover:bg-red-100 dark:border-red-600 dark:bg-red-600 dark:text-white dark:focus:ring-red-700 dark:enabled:hover:border-red-700 dark:enabled:hover:bg-red-700",
    teal: "border border-teal-300 bg-white text-teal-900 focus:ring-4 focus:ring-teal-300 enabled:hover:bg-teal-100 dark:border-teal-600 dark:bg-teal-600 dark:text-white dark:focus:ring-teal-700 dark:enabled:hover:border-teal-700 dark:enabled:hover:bg-teal-700",
    yellow:
      "border border-yellow-300 bg-white text-yellow-900 focus:ring-4 focus:ring-yellow-300 enabled:hover:bg-yellow-100 dark:border-yellow-600 dark:bg-yellow-600 dark:text-white dark:focus:ring-yellow-700 dark:enabled:hover:border-yellow-700 dark:enabled:hover:bg-yellow-700",
    customColor:
      "border border-transparent bg-[#87CEEB] text-black focus:ring-4 focus:ring-bg-[#87CEEB] enabled:hover:bg-[#87CEEB] dark:bg-[#87CEEB] dark:hover:bg-[#87CEEB] dark:focus:ring-bg-[#87CEEB]",
  },

  disabled: "cursor-not-allowed opacity-50",
  isProcessing: "cursor-wait",
  spinnerSlot: "absolute top-0 flex h-full items-center",
  spinnerLeftPosition: {
    xs: "left-2",
    sm: "left-3",
    md: "left-4",
    lg: "left-5",
    xl: "left-6",
  },
  gradient: {
    cyan: "bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-white focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-gradient-to-br dark:focus:ring-cyan-800",
    failure:
      "bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-white focus:ring-4 focus:ring-red-300 enabled:hover:bg-gradient-to-br dark:focus:ring-red-800",
    info: "bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 text-white focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-gradient-to-br dark:focus:ring-cyan-800",
    lime: "bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 text-gray-900 focus:ring-4 focus:ring-lime-300 enabled:hover:bg-gradient-to-br dark:focus:ring-lime-800",
    pink: "bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 text-white focus:ring-4 focus:ring-pink-300 enabled:hover:bg-gradient-to-br dark:focus:ring-pink-800",
    purple:
      "bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white focus:ring-4 focus:ring-purple-300 enabled:hover:bg-gradient-to-br dark:focus:ring-purple-800",
    success:
      "bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white focus:ring-4 focus:ring-green-300 enabled:hover:bg-gradient-to-br dark:focus:ring-green-800",
    teal: "bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 text-white focus:ring-4 focus:ring-teal-300 enabled:hover:bg-gradient-to-br dark:focus:ring-teal-800",
  },
  gradientDuoTone: {
    cyanToBlue:
      "bg-gradient-to-r from-cyan-500 to-cyan-500 text-white focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-gradient-to-bl dark:focus:ring-cyan-800",
    greenToBlue:
      "bg-gradient-to-br from-green-400 to-cyan-600 text-white focus:ring-4 focus:ring-green-200 enabled:hover:bg-gradient-to-bl dark:focus:ring-green-800",
    pinkToOrange:
      "bg-gradient-to-br from-pink-500 to-orange-400 text-white focus:ring-4 focus:ring-pink-200 enabled:hover:bg-gradient-to-bl dark:focus:ring-pink-800",
    purpleToBlue:
      "bg-gradient-to-br from-purple-600 to-cyan-500 text-white focus:ring-4 focus:ring-cyan-300 enabled:hover:bg-gradient-to-bl dark:focus:ring-cyan-800",
    purpleToPink:
      "bg-gradient-to-r from-purple-500 to-pink-500 text-white focus:ring-4 focus:ring-purple-200 enabled:hover:bg-gradient-to-l dark:focus:ring-purple-800",
    redToYellow:
      "bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 text-gray-900 focus:ring-4 focus:ring-red-100 enabled:hover:bg-gradient-to-bl dark:focus:ring-red-400",
    tealToLime:
      "bg-gradient-to-r from-teal-200 to-lime-200 text-gray-900 focus:ring-4 focus:ring-lime-200 enabled:hover:bg-gradient-to-l enabled:hover:from-teal-200 enabled:hover:to-lime-200 enabled:hover:text-gray-900 dark:focus:ring-teal-700",
  },
  inner: {
    base: "flex items-stretch transition-all duration-200",
    position: {
      none: "",
      start: "rounded-r-none",
      middle: "rounded-none",
      end: "rounded-l-none",
    },
    outline: "border border-transparent",
    isProcessingPadding: {
      xs: "pl-8",
      sm: "pl-10",
      md: "pl-12",
      lg: "pl-16",
      xl: "pl-20",
    },
  },
  label:
    "ml-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-cyan-200 text-xs font-semibold text-cyan-800",
  outline: {
    color: {
      gray: "border border-gray-900 dark:border-white",
      default: "border-0",
      light: "",
    },
    off: "",
    on: "flex w-full justify-center bg-white text-gray-900 transition-all duration-75 ease-in group-enabled:group-hover:bg-opacity-0 group-enabled:group-hover:text-inherit dark:bg-gray-900 dark:text-white",
    pill: {
      off: "rounded-md",
      on: "rounded-full",
    },
  },
  pill: {
    off: "rounded",
    on: "rounded-full",
  },
  size: {
    xs: "px-2 py-1 text-xs",
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-base",
    xl: "px-6 py-3 text-base",
    customSize: "py-1 px-6 text-base",
  },
};

export const CarouselTheme = {
  root: {
    base: "relative h-full w-full",

    leftControl:
      "absolute left-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none",
    rightControl:
      "absolute right-0 top-0 flex h-full items-center justify-center px-4 focus:outline-none",
  },
  indicators: {
    active: {
      off: "bg-blue-400 hover:bg-blue-600 dark:bg-gray-800/50 dark:hover:bg-gray-800",
      on: "bg-blue-700 dark:bg-gray-800",
    },
    base: "h-3 w-3 rounded-full",
    wrapper: "absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-3",
  },
  item: {
    base: "absolute left-1/2 top-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
    wrapper: {
      off: "w-full flex-shrink-0 transform cursor-default snap-center",
      on: "w-full flex-shrink-0 transform cursor-grab snap-center",
    },
  },
  control: {
    base: "inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 group-hover:bg-blue-600 group-focus:outline-none group-focus:ring-4 group-focus:ring-white dark:bg-gray-800/30 dark:group-hover:bg-gray-800/60 dark:group-focus:ring-gray-800/70 sm:h-10 sm:w-10",
    icon: "h-5 w-5 text-white dark:text-gray-800 sm:h-6 sm:w-6",
  },
  scrollContainer: {
    base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
    snap: "snap-x",
  },
};

export const TableTheme = {
  root: {
    base: "w-full text-left text-sm text-white dark:text-gray-400",
    shadow:
      "absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-[#14161A] drop-shadow-md dark:bg-black",
    wrapper: "relative",
  },
  body: {
    base: "group/body",
    cell: {
      base: "px-7 py-4 group-first/body:group-first/row:first:rounded-tl-lg group-first/body:group-first/row:last:rounded-tr-lg group-last/body:group-last/row:first:rounded-bl-lg group-last/body:group-last/row:last:rounded-br-lg",
    },
  },
  head: {
    base: "group/head text-xs  uppercase text-black dark:text-gray-400",
    cell: {
      base: "bg-[#87CEEB] px-6 py-3 group-first/head:first:rounded-tl-sm group-first/head:last:rounded-tr-sm dark:bg-gray-700 font-bold",
    },
  },
  row: {
    base: "group/row",
    hovered: "hover:bg-gray-50 dark:hover:bg-gray-600",
    striped:
      "odd:bg-[#14161A] even:bg-gray-50 odd:dark:bg-gray-800 even:dark:bg-gray-700",
  },
};

export const SpinnerTheme = {
  base: "inline animate-spin text-gray-200",
  color: {
    failure: "fill-red-600",
    gray: "fill-gray-600",
    info: "fill-cyan-600",
    pink: "fill-pink-600",
    purple: "fill-purple-600",
    success: "fill-green-500",
    warning: "fill-yellow-400",
  },
  light: {
    off: {
      base: "dark:text-gray-600",
      color: {
        failure: "",
        gray: "dark:fill-gray-300",
        info: "",
        pink: "",
        purple: "",
        success: "",
        warning: "",
      },
    },
    on: {
      base: "",
      color: {
        failure: "",
        gray: "",
        info: "",
        pink: "",
        purple: "",
        success: "",
        warning: "",
      },
    },
  },
  size: {
    xs: "h-3 w-3",
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-10 w-10",
    customSpinnerSize: "h-14 w-14",
  },
};

export const PaginationTheme = {
  base: "",
  layout: {
    table: {
      base: "text-sm text-gray-700 dark:text-gray-400",
      span: "font-semibold text-gray-900 dark:text-white",
    },
  },
  pages: {
    base: "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
    showIcon: "inline-flex",
    previous: {
      base: "ml-0 rounded-lg px-3 py-2 leading-tight text-gray-500 enabled:text-[#87CEEB]",
      icon: "h-5 w-5",
    },
    next: {
      base: "rounded-lg px-3 py-2 leading-tight text-gray-500 enabled:text-[#87CEEB]",
      icon: "h-5 w-5",
    },
    selector: {
      base: "w-12 py-3 leading-tight text-[#87CEEB] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white rounded-full",
      active:
        "bg-gray-300 rounded-full text-cyan-600 hover:bg-cyan-100 hover:text-cyan-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
      disabled: "cursor-not-allowed opacity-50",
    },
  },
};
