import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import FoodConsumptionDashboardCard from '@/Components/FoodConsumptionDashboardCard';

export default function R24hQuestionnaire({ auth, sections }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Recordatório 24h</h2>}
        >
            <Head title="Recordatório 24h" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <FoodConsumptionDashboardCard auth={auth} sections={sections} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
