import s from '@/styles/Home.module.scss';
import LinkA from '@/shared/ui/LinkA/LinkA';
import { NextPageWithLayout } from '@/pages/_app';
import { getLayout } from '@/components/layout';

const Home: NextPageWithLayout = () => {
    return (
        <>
            <main className={s.main}>
                <div>
                    <h1>Incubator Inctagram</h1>
                </div>
                <LinkA href={'/login'} text={'Login'} />
            </main>
        </>
    );
};
Home.getLayout = getLayout;
export default Home;
