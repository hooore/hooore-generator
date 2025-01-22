"use client";

import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@hooore/utils";
import { Cross1Icon } from "@radix-ui/react-icons";

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "ss-fixed ss-top-0 ss-z-[100] ss-flex ss-max-h-screen ss-w-full ss-flex-col-reverse ss-p-4 sm:ss-bottom-0 sm:ss-right-0 sm:ss-top-auto sm:ss-flex-col md:ss-max-w-[420px]",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "data-[state=open]:ss-sm:slide-in-from-bottom-full ss-group ss-pointer-events-auto ss-relative ss-flex ss-w-full ss-items-center ss-justify-between ss-space-x-4 ss-overflow-hidden ss-rounded-md ss-border ss-bg-[rgb(var(--background))] ss-p-6 ss-pr-8 ss-shadow-lg ss-transition-all data-[swipe=cancel]:ss-translate-x-0 data-[swipe=end]:ss-translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:ss-translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:ss-transition-none data-[state=open]:ss-animate-in data-[state=closed]:ss-animate-out data-[swipe=end]:ss-animate-out data-[state=closed]:ss-fade-out-80 data-[state=closed]:ss-slide-out-to-right-full data-[state=open]:ss-slide-in-from-top-full data-[state=open]:sm:ss-slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "ss-border",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "ss-inline-flex ss-h-8 ss-shrink-0 ss-items-center ss-justify-center ss-rounded-full ss-border ss-bg-transparent ss-px-3 ss-text-sm ss-font-medium",
      className
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "ss-ss-opacity-0 ss-absolute ss-right-2 ss-top-2 ss-rounded-full ss-p-1 ss-transition-opacity",
      className
    )}
    toast-close=""
    {...props}
  >
    <Cross1Icon className="ss-h-4 ss-w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("ss-text-sm ss-font-semibold", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("ss-text-sm ss-opacity-90", className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
  type ToastActionElement,
  type ToastProps,
};
