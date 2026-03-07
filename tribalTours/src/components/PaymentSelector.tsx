import React from 'react';
import {
  BanknoteIcon,
  BuildingIcon,
  CreditCardIcon,
  SmartphoneIcon,
  WalletIcon } from
'lucide-react';
import { Badge } from './ui/Badge';
interface PaymentSelectorProps {
  selectedMethod: string;
  onSelect: (method: string) => void;
}
export function PaymentSelector({
  selectedMethod,
  onSelect
}: PaymentSelectorProps) {
  const paymentMethods = [
  {
    id: 'Pay at Venue',
    name: 'Pay at Venue',
    icon: BanknoteIcon,
    available: true,
    description: 'Pay in cash directly to your Giya on the day of the tour.'
  },
  {
    id: 'Online Bank Transfer',
    name: 'Online Bank Transfer',
    icon: BuildingIcon,
    available: false,
    description: 'Transfer directly from your bank account.'
  },
  {
    id: 'Credit / Debit Card',
    name: 'Credit / Debit Card',
    icon: CreditCardIcon,
    available: false,
    description: 'Pay securely with Visa, Mastercard, or Amex.'
  },
  {
    id: 'Maya',
    name: 'Maya (PayMaya)',
    icon: SmartphoneIcon,
    available: false,
    description: 'Pay using your Maya wallet.'
  },
  {
    id: 'GCash',
    name: 'GCash',
    icon: WalletIcon,
    available: false,
    description: 'Pay using your GCash wallet.'
  }];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900 mb-4">
        Select Payment Method
      </h3>

      <div className="space-y-3">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;
          return (
            <div
              key={method.id}
              onClick={() => method.available && onSelect(method.id)}
              className={`relative border rounded-xl p-4 flex items-start transition-all ${!method.available ? 'opacity-60 bg-gray-50 border-gray-200 cursor-not-allowed' : isSelected ? 'border-ocean bg-ocean/5 ring-1 ring-ocean cursor-pointer' : 'border-gray-200 hover:border-ocean/50 cursor-pointer'}`}>

              <div className="flex-shrink-0 mt-1">
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-ocean' : 'border-gray-300'}`}>

                  {isSelected &&
                  <div className="w-2.5 h-2.5 rounded-full bg-ocean" />
                  }
                </div>
              </div>

              <div className="ml-4 flex-grow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Icon
                      className={`w-5 h-5 mr-2 ${isSelected ? 'text-ocean' : 'text-gray-500'}`} />

                    <span
                      className={`font-medium ${isSelected ? 'text-ocean' : 'text-gray-900'}`}>

                      {method.name}
                    </span>
                  </div>
                  {!method.available &&
                  <Badge variant="gray" className="text-[10px]">
                      Coming Soon
                    </Badge>
                  }
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {method.description}
                </p>
              </div>
            </div>);

        })}
      </div>

      <div className="mt-6 bg-amber-50 border border-amber-200 rounded-md p-4 text-sm text-amber-800">
        <strong>Note:</strong> Online payment methods will be available soon.
        For now, all bookings are reserved and paid directly to your Giya at the
        venue.
      </div>
    </div>);

}