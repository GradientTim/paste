import {ActionIcon, Button, Container, Group, Image, Text} from '@mantine/core';
import {useMediaQuery} from '@mantine/hooks';
import {useMatchRoute, useNavigate } from '@tanstack/react-router';
import {PiPlusBold} from 'react-icons/pi';

import logo from '@assets/logo.svg';
import classes from './Navigation.module.pcss';

export default function Navigation(): JSX.Element {
    const isMobile: boolean | undefined = useMediaQuery('(max-width: 36em)');

    const navigate = useNavigate();
    const matchRoute = useMatchRoute();

    const clickBrowse = async (): Promise<void> => {
        if (!matchRoute({ to: '/' })) {
            await navigate({ to: '/' });
        }
    };

    const clickCreateSnippet = async (): Promise<void> => {
        await navigate({
            to: '/pastes/$id',
            params: {
                id: 'new',
            },
        });
    };

    return (<header className={classes.header}>
        <Container className={classes.inner} size={'lg'}>
            <Group>
                <Image src={logo} w={50} h={50} />
                <Text variant={'gradient'} fw={'bold'}>GradientPaste</Text>
            </Group>
            <Group gap={'md'}>
                <Text onClick={clickBrowse} className={classes.link}>Browse</Text>
                {
                    isMobile ? (
                        <ActionIcon size={'input-sm'} variant={'gradient'} onClick={clickCreateSnippet}>
                            <PiPlusBold size={18} />
                        </ActionIcon>
                    ) : (
                        <Button
                            variant={'gradient'}
                            onClick={clickCreateSnippet}
                            rightSection={<PiPlusBold size={15} />}
                        >New Paste</Button>
                    )
                }
            </Group>
        </Container>
    </header>);
}