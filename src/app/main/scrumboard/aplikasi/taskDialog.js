import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, FormHelperText, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { setCloseDialog } from '../store/dataSlice';

const schema = yup.object().shape({
    title: yup.string().required('You must enter a value'),
});
  
function TaskDialog() {
    const dispatch = useDispatch();
    const { aplikasi:app, tasks_dialog } = useSelector(({ scrumboardApp }) => scrumboardApp.data);
    const { aplikasi } = app;
    const { form, open } = tasks_dialog;

    const defaultValues = {
        tasks_id : '',
        type : 'section', //section,task
        title : '',
        completed : false,
        priority : 0,
        aplikasi_id : aplikasi.aplikasi_id,
        order : 0,
        multi : false
    }
  
    const { handleSubmit, register, reset, control, watch, formState } = useForm({
        defaultValues,
        mode: 'all',
        resolver: yupResolver(schema),
    });

    const { isValid, dirtyFields, errors, touchedFields } = formState;
    const data = watch();

    useEffect(() => {
        reset({ ...data, ...form });
    }, [dispatch, form]);

    const handleClose = () => {
        dispatch(setCloseDialog());
    }
    
    return (
        <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle>{ data.tasks_id ? "Edit" : "Tambah" } { data.type === 'section' ? "Section" : "Tasks" }</DialogTitle>
        <DialogContent>
          <form className="w-full" onSubmit={handleSubmit((_data) => console.info(_data))}>
            <div className="mb-b" style={{ display: data.tasks_id ? 'none' : '' }}>
              <Controller
                name="multi"
                type="checkbox"
                control={control}
                render={({ field: { onChange, value, onBlur, ref } }) => (
                  <FormControl error={!!errors.Checkbox} required>
                    <FormControlLabel
                      label="Input Multi"
                      control={
                        <Checkbox
                          checked={value}
                          onBlur={onBlur}
                          onChange={(ev) => onChange(ev.target.checked)}
                          inputRef={ref}
                        />
                      }
                    />
                    <FormHelperText>{errors?.Checkbox?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            </div>
            <div className="mb-8">
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Mudule Menu"
                    variant="outlined"
                    error={!!errors.title}
                    helperText={errors?.title?.message}
                    required
                    fullWidth
                    multiline={data.multi}
                    rows={12}
                  />
                )}
              />
            </div>
            <div className="flex my-12 items-center">
              <Button
                className="mx-8"
                variant="contained"
                color="secondary"
                type="submit"
                disabled={_.isEmpty(dirtyFields) || !isValid}
              >
                Submit
              </Button>

              <Button
                className="mx-8"
                type="button"
                onClick={() => {
                  reset(defaultValues);
                }}
              >
                Reset Form
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    )
}

export default TaskDialog;