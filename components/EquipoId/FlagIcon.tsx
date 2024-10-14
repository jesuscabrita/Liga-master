import { useMediaQuery } from "@mui/material";

export const FlagIcon = ({ nacionalidad }: { nacionalidad: string }) => {
    const mobile = useMediaQuery("(max-width:600px)", { noSsr: true });
    const argentinaFlag = '/images/argentina.png';
    const boliviaFlag = '/images/bolivia.png';
    const brazilFlag = '/images/brazil.png';
    const chileFlag = '/images/chile.png';
    const colombiaFlag = '/images/colombia.png';
    const costaricaFlag = '/images/costarica.png';
    const cubaFlag = '/images/cuba.png';
    const dominicanrepublicFlag = '/images/dominicanrepublic.png';
    const paraguayFlag = '/images/paraguay.png';
    const ecuadorFlag = '/images/ecuador.png';
    const mexicoFlag = '/images/mexico.png';
    const unitedstatesFlag = '/images/unitedstates.png';
    const uruguayFlag = '/images/uruguay.png';
    const venezuelaFlag = '/images/venezuela.png';
    const peruFlag = '/images/peru.png';

    const getImageSource = (nacionalidad: string) => {
        switch (nacionalidad) {
            case 'Argentina':
                return argentinaFlag;
            case 'Bolivia':
                return boliviaFlag;
            case 'Brazil':
                return brazilFlag;
            case 'Chile':
                return chileFlag;
            case 'Colombia':
                return colombiaFlag;
            case 'Costa Rica':
                return costaricaFlag;
            case 'Cuba':
                return cubaFlag;
            case 'Republica Dominicana':
                return dominicanrepublicFlag;
            case 'Paraguay':
                return paraguayFlag;
            case 'Peru':
                return peruFlag;
            case 'Ecuador':
                return ecuadorFlag;
            case 'Mexico':
                return mexicoFlag;
            case 'Estados Unidos':
                return unitedstatesFlag;
            case 'Uruguay':
                return uruguayFlag;
            case 'Venezuela':
                return venezuelaFlag;
            default:
                return null;
        }
    };
    const imageSource = getImageSource(nacionalidad);

    if (imageSource) {
        return <img src={imageSource} alt={nacionalidad} width={mobile ? 20 : 28} />;
    }

    return null;
};