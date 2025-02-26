import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import FoodTrackingManager from '@/Components/FoodTrackingManager';

export default function FoodTracking({ auth }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Acompanhamento Alimentar</h2>}
        >
            <Head title="Acompanhamento Alimentar" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <FoodTrackingManager auth={auth} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
