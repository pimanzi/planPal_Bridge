import { useTranslation } from 'react-i18next';
import { BsDot } from 'react-icons/bs';
import { useTasks } from './useTasks';
import { formatLocalizedDateShortActivity } from '@/utils/helpers';
function TasksHeader() {
  const { tasks } = useTasks();
  const task = tasks ? tasks : [];
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between  xsTablet:pl-[30px] smTablet:pl-[20px]">
      <div className="space-y-2">
        <h2 className="font-inter text-2xl font-bold">
          {t('titleTaskHeader')}
        </h2>
        <p className="font-inter text-lg  text-[var(--color-grey-500)]">
          {t('motivationTaskHeader1')}{' '}
          <span className="text-second-main-color">
            {t('motivationTaskHeader2')}
          </span>
        </p>
      </div>

      <div className="hidden flex-col items-center xsPhone:hidden xs:flex">
        <p className="self-end font-inter font-semibold">
          {' '}
          {t('fromTaskHeader')},{' '}
          {formatLocalizedDateShortActivity(new Date(task[0]?.created_at))}
        </p>
        <p className="flex items-center font-inter text-[var(--color-grey-500)]">
          <BsDot className="inline-block" fill="#54d51d" size={35}></BsDot>{' '}
          <span>
            {t('toTaskHeader')},{' '}
            {formatLocalizedDateShortActivity(
              new Date(task[task.length - 1].created_at)
            )}
          </span>
        </p>
      </div>
    </div>
  );
}

export default TasksHeader;
