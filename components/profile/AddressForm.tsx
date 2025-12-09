import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Loader, X } from 'lucide-react';
import { postAddressCreateApi, updateAddressApi } from '../../api-endpoints/CartsApi';
import { InvalidateQueryFilters, useQueryClient } from '@tanstack/react-query';


interface AddressFormProps {
  openModal: boolean;
  handleClose: () => void;
  editData: any;
}

export default function AddressForm({ openModal, handleClose, editData }: AddressFormProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const storedUserName = localStorage.getItem('userName');

    setUserId(storedUserId);
    setUserName(storedUserName);
  }, []);

  const { control, handleSubmit, setValue, reset, formState: { errors } } = useForm<any>({
    defaultValues: {
      address_line1: editData?.address_line1 || '',
      address_line2: editData?.address_line2 || '',
      address_type: editData?.address_type || '',
      city: editData?.city || '',
      state: editData?.state || '',
      postal_code: editData?.postal_code || '',
      country: editData?.country || '',
      landmark: editData?.landmark || '',
    }
  });

  // Use useEffect to update form values when `editData` changes
  useEffect(() => {
    if (editData) {
      setValue('customer_name', editData?.customer_name || '');
      setValue('address_line1', editData?.address_line1 || '');
      setValue('address_line2', editData?.address_line2 || '');
      setValue('address_type', editData?.address_type || '');
      setValue('city', editData?.city || '');
      setValue('state', editData?.state || '');
      setValue('postal_code', editData?.postal_code || '');
      setValue('country', editData?.country || '');
      setValue('landmark', editData?.landmark || '');
      setValue('contact_number', editData?.contact_number || '');
      setValue('email_address', editData?.email_address || '');
    }
  }, [editData, setValue]);

  // Return null if the modal is not open
  if (!openModal) return null;

  // Form submission handler
  const onFormSubmit = async (data: any) => {
    setLoading(true);
    const formattedData = {
      user: userId,
      customer_name: data?.customer_name,
      address_line1: data.address_line1,
      address_line2: data.address_line2,
      contact_number: data.contact_number,
      email_address: data.email_address,
      address_type: data.address_type,
      city: data.city,
      state: data.state,
      postal_code: data.postal_code,
      country: data.country,
      landmark: data.landmark,
      ...(editData
        ? { updated_by: userName || 'user' }
        : { created_by: userName || 'user' }),
      // selected_address: true,
      // is_primary: true,
    };
    if (editData) {
      try {
        const response = await updateAddressApi(`${editData?.id}`, formattedData);
        if (response) {
          queryClient.invalidateQueries(['getAddressData'] as InvalidateQueryFilters);
          reset()
          handleClose();
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    } else {
      try {
        const response = await postAddressCreateApi('', formattedData);
        if (response) {
          queryClient.invalidateQueries(['postGoalType'] as InvalidateQueryFilters);
          reset()
          handleClose();
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

  };

  return (
    <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
      <div
        className="bg-white rounded-lg shadow-lg max-h-[90vh] overflow-y-auto w-full max-w-3xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h2 className="text-xl font-semibold">
            {editData ? "Edit Address" : "Add Your Address"}
          </h2>
          <button
            type="button"
            onClick={() => {
              handleClose();
              reset();
            }}
            className="text-gray-500 hover:text-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {/* First Row */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Name
              </label>
              <Controller
                control={control}
                name="customer_name"
                render={({ field }) => (
                  <input
                    {...field}
                    id="customer_name"
                    required
                    className="block w-full border border-gray-300 rounded-md p-2 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Controller
                control={control}
                name="email_address"
                render={({ field }) => (
                  <input
                    {...field}
                    id="email_address"
                    required
                    className="block w-full border border-gray-300 rounded-md p-2 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                )}
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact
              </label>
              <Controller
                control={control}
                name="contact_number"
                render={({ field }) => (
                  <input
                    {...field}
                    id="contact_number"
                    required
                    className="block w-full border border-gray-300 rounded-md p-2 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Type
              </label>
              <Controller
                control={control}
                name="address_type"
                render={({ field }) => (
                  <input
                    {...field}
                    id="address_type"
                    required
                    className="block w-full border border-gray-300 rounded-md p-2 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                )}
              />
            </div>
          </div>

          {/* Address Lines */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 1
              </label>
              <Controller
                control={control}
                name="address_line1"
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="address_line1"
                    required
                    rows={2}
                    className="block w-full border border-gray-300 rounded-md p-2 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 2
              </label>
              <Controller
                control={control}
                name="address_line2"
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="address_line2"
                    rows={2}
                    className="block w-full border border-gray-300 rounded-md p-2 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                )}
              />
            </div>
          </div>

          {/* City / State / Pincode */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <Controller
                control={control}
                name="city"
                render={({ field }) => (
                  <input
                    {...field}
                    id="city"
                    required
                    className="block w-full border border-gray-300 rounded-md p-2 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <Controller
                control={control}
                name="state"
                render={({ field }) => (
                  <input
                    {...field}
                    id="state"
                    required
                    className="block w-full border border-gray-300 rounded-md p-2 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pin Code
              </label>
              <Controller
                control={control}
                name="postal_code"
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    id="postal_code"
                    required
                    maxLength={6}
                    className="block w-full border border-gray-300 rounded-md p-2 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                )}
              />
            </div>
          </div>

          {/* Country / Landmark */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <Controller
                control={control}
                name="country"
                render={({ field }) => (
                  <input
                    {...field}
                    id="country"
                    required
                    className="block w-full border border-gray-300 rounded-md p-2 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Landmark
              </label>
              <Controller
                control={control}
                name="landmark"
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="landmark"
                    rows={2}
                    className="block w-full border border-gray-300 rounded-md p-2 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                )}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 border-t pt-4">
            <button
              type="button"
              onClick={() => {
                handleClose();
                reset();
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-900 text-white font-semibold rounded-md hover:bg-yellow-600 disabled:opacity-50 flex items-center gap-2"
            >
              Save
              {loading && <Loader className="animate-spin w-4 h-4" />}
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}
