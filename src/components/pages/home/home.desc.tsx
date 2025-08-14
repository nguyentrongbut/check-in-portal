import FadeText from "@/components/animations/fade.text";

interface HomeDescProps {
    beforeHighlight: string;
    highlight: string;
    afterHighlight: string;
}

const HomeDesc = ({
                      beforeHighlight,
                      highlight,
                      afterHighlight,
                  }: HomeDescProps) => {
    return (
        <FadeText
            className="text-[50px] font-light mt-3 leading-[1.2] text-white"
        >
            {beforeHighlight}
            <span className="font-medium text-primary">{highlight}</span>
            {afterHighlight}
        </FadeText>
    );
};

export default HomeDesc;
