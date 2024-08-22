import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import clsx from 'clsx';
import { Text } from '../text';

type ArticleParamsFormProps = {
	setCurrentArticleState: (param: ArticleStateType) => void;
	currentArticleState: ArticleStateType;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const [selectArticleState, setSelectArticleState] =
		useState<ArticleStateType>(currentArticleState);

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setSelectArticleState({ ...selectArticleState, [key]: value });
	};

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setOpen(false),
		onChange: setOpen,
		event: 'mousedown',
	});

	return (
		<>
			<div ref={rootRef}>
				<ArrowButton onClick={setOpen} isOpen={isOpen} />
				<aside
					className={clsx(styles.container, isOpen && styles.container_open)}>
					<form
						className={styles.form}
						onSubmit={(e) => {
							e.preventDefault();
							setCurrentArticleState(selectArticleState);
						}}>
						<Text size={31} weight={800} uppercase={true}>
							Задайте параметры
						</Text>
						<Select
							selected={selectArticleState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(option) => handleChange('fontFamilyOption', option)}
							title='Шрифт'
						/>
						<RadioGroup
							name='radio'
							options={fontSizeOptions}
							selected={selectArticleState.fontSizeOption}
							onChange={(option) => handleChange('fontSizeOption', option)}
							title='Размер шрифта'
						/>
						<Select
							selected={selectArticleState.fontColor}
							options={fontColors}
							onChange={(option) => handleChange('fontColor', option)}
							title='Цвет'
						/>
						<Separator />
						<Select
							selected={selectArticleState.backgroundColor}
							options={backgroundColors}
							onChange={(option) => handleChange('backgroundColor', option)}
							title='Цвет фона'
						/>
						<Select
							selected={selectArticleState.contentWidth}
							options={contentWidthArr}
							onChange={(option) => handleChange('contentWidth', option)}
							title='Ширина контента'
						/>
						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								type='reset'
								onClick={() => {
									setSelectArticleState(defaultArticleState);
									setCurrentArticleState(defaultArticleState);
								}}
							/>
							<Button title='Применить' type='submit' />
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
