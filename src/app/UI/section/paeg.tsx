import LoginPage from '@/app/login/page';
import Image from 'next/image';

interface Section {
    name: string;
    icon: string;
    business?: {
        name: string;
    };
    alt: string;
    size: number;
    quality?: number;
}

const Section = ({ section }: { section: Section }) => {
    return (
        <a
            href={`#/${LoginPage}`}
            title={`View ${section.icon} section for ${section.business?.name}`}
        >
            <Image
                src="/3.png"
                alt={section.alt}
                width={section.size}
                height={section.size}
                priority={section.size > 100}
                style={{ width: 'auto', height: 'auto' }}
         
               
                quality={section.quality ? section.quality : 50}
            />
        </a>
    );
}

export default Section;