
import React, { useContext, useMemo } from 'react';
import { AdminContext } from '../context/AdminContext';

const PromotionBanner: React.FC = () => {
    const { promotions } = useContext(AdminContext);

    const activePromotion = useMemo(() => {
        return promotions.find(p => p.isActive);
    }, [promotions]);

    if (!activePromotion) {
        return null;
    }

    return (
        <div className="bg-gradient-to-r from-yellow-600 to-amber-400 text-center p-2 text-sm text-black font-semibold">
            <a href={activePromotion.link || '#'} className="hover:underline">
                {activePromotion.message}
            </a>
        </div>
    );
};

export default PromotionBanner;
