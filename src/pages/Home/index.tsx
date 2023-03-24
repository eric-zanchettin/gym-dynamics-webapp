import { Card, Grid } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { GymCard } from "../../components/GymCard";

export function Home() {
    return (
        <>
            <Helmet>
                <title>Home | Gym Dynamics</title>
            </Helmet>
            <Grid m={4} mt={20} h="90vh" gridTemplateColumns="1fr 1fr 1fr 1fr" gap="24px 0">
                <GymCard
                    id={1}
                    image="https://www.abcdacomunicacao.com.br/wp-content/uploads/bioritmo.jpg"
                    name="Bioritmo"
                    description="A Academia Bio Ritmo une arquitetura, tecnologia e treinos de alta intensidade para promover uma experiência completa por um preço especial para você."
                    cheaperPlan={80}
                />
                <GymCard
                    id={2}
                    image="https://d1a3v8txm37nbo.cloudfront.net/image/filename/1405117/x_lg_o-OH6-LBWiAMTo5axsciQ4Tslp1QZnHH.png"
                    name="DualFit"
                    description="A DualFit é uma academia diferente das convencionais, reconhecida pela qualidade do atendimento e satisfação do aluno. Sem estereótipos, oferecemos programas especiais de treinamento com ambiente humanizado e mais de 20 modalidades de aulas."
                    cheaperPlan={100}
                />
                <GymCard
                    id={3}
                    image="http://gavioes.devphp.com.br/storage/uploads/2020-08-01-19-19-09_ae549a1a10c018b2a5cdb186afdecee3.jpg"
                    name="Gaviões 24hs"
                    description="A Academia Gaviões tem como proposito é transformar vidas através da atividade física, acreditamos que uma vida mais saudável é uma vida mais feliz. Nossa estrutura oferece uma grande variedade de equipamentos."
                    cheaperPlan={120}
                />
                <GymCard
                    id={4}
                    image="https://yata.s3-object.locaweb.com.br/9022df0761059a2b4fde3601cb9bc26efd1fac0e27a1ee559ba04971407d7670"
                    name="K@2"
                    description="A Academia K2 Fitness Technology iniciou suas atividades em 2002. Em 2004, foi eleita a melhor academia da Zona Norte de São Paulo pelo jornal “O Estado de São Paulo”. Sua sede própria, localizada em Santana, coração da Zona Norte de São Paulo."
                    cheaperPlan={95}
                />
                <GymCard
                    id={5}
                    image="https://d3c1e34umh9o6d.cloudfront.net/image/filename/2379805/x_lg_l38dgzgRteaqpf75Z4kPyuOXOfl901M9.jpeg"
                    name="Family Fit"
                    description="Family.fit é um programa para todas as idades, ideal para ajudar sua família a crescer juntos na fé e na aptidão física."
                    cheaperPlan={69.99}
                />
            </Grid>
        </>
    );
};