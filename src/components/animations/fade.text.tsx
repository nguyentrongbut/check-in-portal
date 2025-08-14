'use client'

import React from 'react';
import { motion, Variants } from 'framer-motion';

interface FadeTextProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    once?: boolean;
    amount?: number;
}

const FadeText: React.FC<FadeTextProps> = ({
                                               children,
                                               className = '',
                                               delay = 0,
                                               duration = 0.5,
                                               once = true,
                                               amount = 0.2
                                           }) => {
    const splitTextToWords = (element: React.ReactNode): React.ReactNode[] => {
        if (typeof element === 'string') {
            return element.split(' ').filter(word => word.length > 0);
        }

        if (React.isValidElement(element)) {
            const el = element as React.ReactElement<Record<string, unknown>>;
            if (typeof el.props.children === 'string') {
                const words = el.props.children.split(' ').filter((word: string) => word.length > 0);
                return words.map((word: string, index: number) =>
                    React.cloneElement(el, { key: index }, word)
                );
            }
            return [element];
        }

        return [];
    };

    const processChildren = (children: React.ReactNode): React.ReactNode[] => {
        const result: React.ReactNode[] = [];
        React.Children.forEach(children, (child) => {
            const words = splitTextToWords(child);
            result.push(...words);
        });
        return result;
    };

    const words = processChildren(children);

    const container: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: delay,
            },
        },
    };

    const item: Variants = {
        hidden: {
            opacity: 0,
            y: 20,
            filter: 'blur(4px)',
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration: duration,
                ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number], 
            },
        },
    };

    return (
        <motion.div
            className={className}
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount }}
        >
            {words.map((word, index) => (
                <motion.span
                    key={index}
                    variants={item}
                    className="inline-block mr-3 last:mr-0"
                >
                    {word}
                </motion.span>
            ))}
        </motion.div>
    );
};

export default FadeText;
