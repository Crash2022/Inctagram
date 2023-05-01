import s from '@/styles/Home.module.scss';
import LinkA from '@/shared/ui/LinkA/LinkA';
import { NextPageWithLayout } from '@/pages/_app';
import { getLayout } from '@/components/Layout/Layout';
import { Button } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { SearchInput } from '@/shared/ui/SearchInput/SearchInput';

const Home: NextPageWithLayout = () => {
    return (
        <>
            <main className={s.main}>
                <div style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <div
                            style={{
                                display: 'flex',
                                width: '200px',
                                flexDirection: 'column',
                                gap: '20px'
                            }}
                        >
                            <Button theme={'primary'}>Button</Button>
                            <Button theme={'primaryWhite'}>Button</Button>
                            <Button theme={'outline'}>Button</Button>
                            <Button theme={'clear'}>Button</Button>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                width: '200px',
                                flexDirection: 'column',
                                gap: '20px'
                            }}
                        >
                            <Button disabled theme={'primary'}>
                                Button
                            </Button>
                            <Button disabled theme={'primaryWhite'}>
                                Button
                            </Button>
                            <Button disabled theme={'outline'}>
                                Button
                            </Button>
                            <Button disabled theme={'clear'}>
                                Button
                            </Button>
                        </div>
                    </div>
                </div>
                <LinkA href={'/login'} text={'Login'} />
                <div style={{ marginBottom: '25px', width: '450px' }}>
                    <Input placeholder={'Email'} />
                </div>
                <div style={{ marginBottom: '25px', width: '450px' }}>
                    <SearchInput placeholder={'Search input'} />
                </div>
                <div style={{ marginBottom: '25px', width: '450px' }}>
                    <Input placeholder={'Password'} password />
                </div>
                <div style={{ marginBottom: '25px', width: '450px' }}>
                    <Input placeholder={'Password'} error={'Error Text'} password />
                </div>
                <div style={{ marginBottom: '25px', width: '450px' }}>
                    <SearchInput placeholder={'Search input'} error={'Error Text'} />
                </div>
            </main>
        </>
    );
};

Home.getLayout = getLayout;
export default Home;
