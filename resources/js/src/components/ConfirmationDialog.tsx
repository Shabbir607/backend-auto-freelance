"use client";

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { AlertTriangle, Loader2 } from 'lucide-react';
import { createContext, ReactNode, useContext, useState } from 'react';

interface ConfirmationOptions {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
}

interface ConfirmationContextType {
  confirm: (options: ConfirmationOptions) => Promise<boolean>;
}

const ConfirmationContext = createContext<ConfirmationContextType | undefined>(undefined);

export function ConfirmationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<ConfirmationOptions>({
    title: 'Confirm Action',
    description: 'Are you sure?',
  });
  const [resolveCallback, setResolveCallback] = useState<((value: boolean) => void) | null>(null);

  const confirm = (confirmOptions: ConfirmationOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setOptions(confirmOptions);
      setResolveCallback(() => resolve);
      setIsOpen(true);
    });
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    if (resolveCallback) {
      resolveCallback(true);
    }
    setTimeout(() => {
      setIsOpen(false);
      setIsLoading(false);
    }, 300);
  };

  const handleCancel = () => {
    if (resolveCallback) {
      resolveCallback(false);
    }
    setIsOpen(false);
  };

  return (
    <ConfirmationContext.Provider value={{ confirm }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3">
              {options.isDangerous && (
                <div className="flex-shrink-0">
                  <AlertTriangle className="h-5 w-5 text-red-500" />
                </div>
              )}
              <DialogTitle className={options.isDangerous ? 'text-red-600' : ''}>
                {options.title}
              </DialogTitle>
            </div>
            {options.description && (
              <DialogDescription className="mt-2">
                {options.description}
              </DialogDescription>
            )}
          </DialogHeader>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
            >
              {options.cancelText || 'Cancel'}
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={isLoading}
              className={options.isDangerous ? 'bg-red-600 hover:bg-red-700 text-white' : ''}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {options.confirmText || 'Confirm'}
                </>
              ) : (
                options.confirmText || 'Confirm'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </ConfirmationContext.Provider>
  );
}

export function useConfirmation() {
  const context = useContext(ConfirmationContext);
  if (!context) {
    throw new Error('useConfirmation must be used within ConfirmationProvider');
  }
  return context;
}
